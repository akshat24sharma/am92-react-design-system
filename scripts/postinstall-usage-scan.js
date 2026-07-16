#!/usr/bin/env node

/* eslint-disable no-undef */

import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

/**
 * Script to analyze usage of @am92/react-design-system components in the
 * consumer project. Runs automatically as a postinstall hook.
 *
 * Scans all .ts, .tsx, .js, .jsx files (excluding tests/stories) and writes
 * design-system-usage-report.json in the consumer project root.
 *
 * Can also be run manually:
 *   node analyze-design-system-usage.js [path]
 *
 * Examples:
 *   node analyze-design-system-usage.js          # Analyze entire project
 *   node analyze-design-system-usage.js src      # Analyze only src directory
 *   node analyze-design-system-usage.js src/Components
 */

class DesignSystemAnalyzer {
  constructor(projectRoot = process.cwd(), consumerRoot = process.cwd()) {
    this.projectRoot = projectRoot
    this.originalWorkingDirectory = consumerRoot
    // Map for Subzero (DS) component usage
    this.componentUsage = new Map()
    // Map for non‑Subzero component usage (components whose JSX tag does not start with "Ds")
    this.nonSubzeroUsage = new Map()
    this.fileAnalysis = new Map()
    this.excludeDirs = [
      'node_modules',
      'build',
      'dist',
      '.git',
      'coverage',
      'source-maps'
    ]
    this.includeExtensions = ['.ts', '.tsx', '.js', '.jsx']
  }

  /**
   * Main analysis function
   */
  async analyze() {
    console.log('🔍 Analyzing @am92/react-design-system usage...\n')

    try {
      // Find all relevant files
      const files = this.findRelevantFiles(this.projectRoot)
      console.log(`📁 Found ${files.length} files to analyze\n`)

      // Analyze each file
      for (const file of files) {
        await this.analyzeFile(file)
      }

      // Generate and display report
      await this.generateReport()
    } catch (error) {
      console.error(
        '❌ Error during analysis:',
        error instanceof Error ? error.message : error
      )
    }
  }

  /**
   * Find all relevant files to analyze
   */
  findRelevantFiles(dirPath) {
    const files = []

    const scanDirectory = dir => {
      try {
        const items = fs.readdirSync(dir)

        for (const item of items) {
          const fullPath = path.join(dir, item)
          const stats = fs.statSync(fullPath)

          if (stats.isDirectory()) {
            // Skip excluded directories
            if (!this.excludeDirs.includes(item)) {
              scanDirectory(fullPath)
            }
          } else if (stats.isFile()) {
            // Include files with relevant extensions, exclude tests/stories
            const ext = path.extname(item)
            const isTestOrStory = /\.(test|spec|stories)\.[jt]sx?$/.test(item)
            if (this.includeExtensions.includes(ext) && !isTestOrStory) {
              files.push(fullPath)
            }
          }
        }
      } catch (error) {
        console.warn(`⚠️  Skipping directory ${dir}: ${error.message}`)
      }
    }

    scanDirectory(dirPath)
    return files
  }

  /**
   * Remove comments from content before analysis
   */
  removeComments(content) {
    // Remove single-line comments (// comments)
    content = content.replace(/\/\/.*$/gm, '')

    // Remove multi-line comments (/* comments */)
    content = content.replace(/\/\*[\s\S]*?\*\//g, '')

    // Remove JSX/HTML comments (<!-- comments -->)
    content = content.replace(/<!--[\s\S]*?-->/g, '')

    return content
  }

  /**
   * Analyze a single file for design system usage
   */
  async analyzeFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf-8')

      // Remove comments before analysis
      content = this.removeComments(content)

      // Get relative path for cleaner output
      const relativePath = path.relative(this.projectRoot, filePath)

      // Find imports from @am92/react-design-system
      const imports = this.findImportStatements(content)

      if (imports.length === 0) {
        return // Skip files without design system imports
      }

      console.log(`📄 Analyzing: ${relativePath}`)

      // Create file analysis data
      const fileData = {
        path: relativePath,
        imports: imports,
        componentUsage: new Map(),
        totalComponents: 0
      }

      // Count usage of each imported component (Subzero components)
      for (const component of imports) {
        const usageCount = this.countComponentUsage(content, component)

        if (usageCount.total > 0) {
          fileData.componentUsage.set(component, usageCount)
          fileData.totalComponents += usageCount.total

          // Update global component usage
          this.updateGlobalUsage(component, relativePath, usageCount)
        }
      }

      // Additionally count usage of non‑Subzero components (JSX tags not starting with "Ds")
      const nonSubzeroCounts = this.countNonSubzeroComponents(content)
      for (const [componentName, count] of nonSubzeroCounts.entries()) {
        // Record per‑file data for non‑Subzero components
        if (!fileData.componentUsage.has(componentName)) {
          fileData.componentUsage.set(componentName, {
            total: count,
            jsx: count,
            function: 0
          })
        } else {
          const existing = fileData.componentUsage.get(componentName)
          existing.total += count
          existing.jsx += count
        }
        fileData.totalComponents += count
        this.updateGlobalNonSubzeroUsage(componentName, relativePath, {
          total: count,
          jsx: count,
          function: 0
        })
      }

      // Store file analysis data
      this.fileAnalysis.set(relativePath, fileData)
    } catch (error) {
      console.error(`❌ Error analyzing ${filePath}:`, error.message)
    }
  }

  /**
   * Find import statements from @am92/react-design-system
   */
  findImportStatements(content) {
    const imports = []

    // Define patterns to match different import types
    const importPatterns = [
      // Named imports: import { Component1, Component2 } from '@am92/react-design-system'
      /import\s*\{\s*([^}]+)\s*\}\s*from\s*['"]@am92\/react-design-system(?:\/[^'"]*)?['"][;\s]*/g,
      // Default imports: import Component from '@am92/react-design-system'
      /import\s+(\w+)\s+from\s*['"]@am92\/react-design-system(?:\/[^'"]*)?['"][;\s]*/g,
      // Mixed imports: import Component, { Other } from '@am92/react-design-system'
      /import\s+(\w+)\s*,\s*\{\s*([^}]+)\s*\}\s*from\s*['"]@am92\/react-design-system(?:\/[^'"]*)?['"][;\s]*/g
      // Note: `import type { ... }` is intentionally excluded — type-only imports
      // are never JSX components and would cause false positives (e.g. SupportedColorScheme)
    ]

    for (const pattern of importPatterns) {
      let match
      while ((match = pattern.exec(content)) !== null) {
        if (match[2]) {
          // Mixed import: Component, { Other }
          if (match[1] && match[1].trim()) {
            imports.push(match[1].trim())
          }
          const namedImports = match[2]
            .split(',')
            .map(name => name.trim())
            .filter(name => name && name.length > 0)
          imports.push(...namedImports)
        } else if (match[1]) {
          // Named or default imports - handle all comma-separated components
          const components = match[1]
            .split(',')
            .map(name => name.trim())
            .filter(name => name && name.length > 0)
          imports.push(...components)
        }
      }
    }

    // Remove duplicates, strip aliases, and exclude inline type-only imports
    // e.g. `import { type Foo, Bar }` — `type Foo` must be dropped, not just stripped
    return [...new Set(imports)]
      .filter(name => !name.startsWith('type ')) // drop inline `type Foo` items
      .filter(name => name && name.length > 0)
  }

  /**
   * Count usage of a specific component in content
   */
  countComponentUsage(content, componentName) {
    // Count JSX usage: <ComponentName ...> or self‑closing <ComponentName/>
    const jsxPattern = new RegExp(`<${componentName}(?:[^>]*>|\\s*/>)`, 'g')
    const jsxMatches = content.match(jsxPattern) || []

    // Filter out closing tags (e.g., </ComponentName>)
    const openingTags = jsxMatches.filter(match => !match.startsWith('</'))
    const jsxCount = openingTags.length

    // For component usage reporting we only consider JSX occurrences.
    // Function‑style calls or type references are ignored to avoid counting
    // TypeScript type imports or other non‑component usages.
    const functionCount = 0

    return {
      total: jsxCount,
      jsx: jsxCount,
      function: functionCount
    }
  }

  /**
   * Count usage of components that are not part of the Subzero design system.
   * It scans for JSX tags whose name does NOT start with "Ds" (case‑sensitive).
   * Returns a Map where key is component name and value is the number of JSX occurrences.
   */
  countNonSubzeroComponents(content) {
    const map = new Map()

    // Known non-JSX patterns to exclude
    const isNonJsxName = name => {
      if (name.startsWith('Ds')) return true
      if (name.startsWith('HTML')) return true // HTMLDivElement, HTMLLIElement, etc.
      if (name.startsWith('SVG')) return true // SVGElement, SVGPathElement, etc.
      if (name.startsWith('CSS')) return true // CSSProperties, etc.

      const primitiveTypeNames = new Set([
        'string',
        'number',
        'boolean',
        'unknown',
        'any',
        'never',
        'void',
        'null',
        'undefined',
        'object',
        'symbol',
        'bigint'
      ])

      if (primitiveTypeNames.has(name)) return true

      const nonJsxSuffixes = [
        'Props',
        'Prop',
        'Type',
        'Types',
        'Config',
        'Options',
        'Ref',
        'Context',
        'Event',
        'Handler',
        'Callback',
        'Element',
        'Node',
        'Error',
        'State',
        'Action',
        'Params',
        'Args',
        'Result',
        'Response',
        'Request'
      ]

      return nonJsxSuffixes.some(suffix => name.endsWith(suffix))
    }

    // Require a non-identifier boundary before '<' to avoid TS generics
    // like `useState<string>()` or `Promise<AddressData>` being treated as JSX.
    const jsxPattern =
      /(^|[^A-Za-z0-9_$])<([A-Za-z][A-Za-z0-9_-]*)(\s[^>]*\/?>|\/?>(?!\w|<|,|;))/g

    let match
    while ((match = jsxPattern.exec(content)) !== null) {
      const name = match[2]
      if (isNonJsxName(name)) continue
      const prev = map.get(name) || 0
      map.set(name, prev + 1)
    }

    return map
  }

  /**
   * Update global usage map for non‑Subzero components.
   * Re‑uses the same structure as componentUsage to keep reporting consistent.
   */
  /**
   * Update global usage map for non‑Subzero components.
   */
  updateGlobalNonSubzeroUsage(componentName, filePath, usageData) {
    if (!this.nonSubzeroUsage.has(componentName)) {
      this.nonSubzeroUsage.set(componentName, {
        total: 0,
        files: [],
        jsx: 0,
        function: 0
      })
    }

    const globalData = this.nonSubzeroUsage.get(componentName)

    // Add file usage data
    globalData.files.push({
      path: filePath,
      count: usageData.total,
      jsx: usageData.jsx,
      function: usageData.function
    })

    // Update totals
    globalData.total += usageData.total
    globalData.jsx += usageData.jsx
    globalData.function += usageData.function
  }

  /**
   * Update global component usage statistics
   */
  updateGlobalUsage(componentName, filePath, usageData) {
    if (!this.componentUsage.has(componentName)) {
      this.componentUsage.set(componentName, {
        total: 0,
        files: [],
        jsx: 0,
        function: 0
      })
    }

    const globalData = this.componentUsage.get(componentName)

    // Add file usage data
    globalData.files.push({
      path: filePath,
      count: usageData.total,
      jsx: usageData.jsx,
      function: usageData.function
    })

    // Update totals
    globalData.total += usageData.total
    globalData.jsx += usageData.jsx
    globalData.function += usageData.function
  }

  /**
   * Generate and display the analysis report
   */
  async generateReport() {
    // Separate sorted lists for Subzero (DS) and non‑Subzero components
    const sortedDsComponents = Array.from(this.componentUsage.entries()).sort(
      ([, a], [, b]) => b.total - a.total
    )
    const sortedNonDsComponents = Array.from(
      this.nonSubzeroUsage.entries()
    ).sort(([, a], [, b]) => b.total - a.total)

    const filesUsingComponents = Array.from(this.fileAnalysis.values()).filter(
      file => file.totalComponents > 0
    )

    // Console Report
    console.log('\n' + '='.repeat(80))
    console.log('📊 DESIGN SYSTEM USAGE ANALYSIS REPORT')
    console.log('='.repeat(80))

    // Summary statistics
    console.log('\n📈 SUMMARY STATISTICS')
    console.log('─'.repeat(40))
    console.log(
      `Total files using design system: ${filesUsingComponents.length}`
    )
    console.log(`Unique Subzero components used: ${sortedDsComponents.length}`)
    console.log(
      `Unique non‑Subzero components used: ${sortedNonDsComponents.length}`
    )
    const totalDsUsage = sortedDsComponents.reduce(
      (sum, [, data]) => sum + data.total,
      0
    )
    const totalNonDsUsage = sortedNonDsComponents.reduce(
      (sum, [, data]) => sum + data.total,
      0
    )
    console.log(`Total Subzero component usage count: ${totalDsUsage}`)
    console.log(`Total non‑Subzero component usage count: ${totalNonDsUsage}`)

    // Top components
    // Top Subzero components
    console.log('\n🏆 TOP SUBZERO COMPONENTS')
    console.log('─'.repeat(40))
    const topDsComponents = sortedDsComponents.slice(0, 10)
    topDsComponents.forEach(([name, data], index) => {
      console.log(
        `${index + 1}. ${name}: ${data.total} usages (${data.files.length} files)`
      )
      console.log(`   JSX: ${data.jsx}, Function/Other: ${data.function}`)
    })

    // Top non‑Subzero components
    console.log('\n🏆 TOP NON‑SUBZERO COMPONENTS')
    console.log('─'.repeat(40))
    const topNonDsComponents = sortedNonDsComponents.slice(0, 10)
    topNonDsComponents.forEach(([name, data], index) => {
      console.log(
        `${index + 1}. ${name}: ${data.total} usages (${data.files.length} files)`
      )
      console.log(`   JSX: ${data.jsx}, Function/Other: ${data.function}`)
    })

    // Detailed breakdown
    console.log('\n📋 DETAILED COMPONENT BREAKDOWN')
    console.log('─'.repeat(40))

    // Detailed breakdown for Subzero components
    sortedDsComponents.forEach(([name, data]) => {
      console.log(`\n🔸 ${name}`)
      console.log(`   Total Usage: ${data.total}`)
      console.log(`   Files Using: ${data.files.length}`)
      console.log(
        `   Usage Breakdown: JSX: ${data.jsx}, Function/Other: ${data.function}`
      )
      const filesToShow = data.files.slice(0, 3)
      filesToShow.forEach(file => {
        console.log(`   📁 ${file.path}: ${file.count} times`)
      })
      if (data.files.length > 3) {
        console.log(`   📁 ... and ${data.files.length - 3} more files`)
      }
    })

    // Detailed breakdown for non‑Subzero components
    sortedNonDsComponents.forEach(([name, data]) => {
      console.log(`\n🔹 ${name}`)
      console.log(`   Total Usage: ${data.total}`)
      console.log(`   Files Using: ${data.files.length}`)
      console.log(
        `   Usage Breakdown: JSX: ${data.jsx}, Function/Other: ${data.function}`
      )
      const filesToShow = data.files.slice(0, 3)
      filesToShow.forEach(file => {
        console.log(`   📁 ${file.path}: ${file.count} times`)
      })
      if (data.files.length > 3) {
        console.log(`   📁 ... and ${data.files.length - 3} more files`)
      }
    })

    // Files analysis
    console.log('\n📁 FILES ANALYSIS')
    console.log('─'.repeat(40))

    const sortedFiles = filesUsingComponents.sort(
      (a, b) => b.totalComponents - a.totalComponents
    )

    sortedFiles.forEach(fileData => {
      console.log(`\n📄 ${fileData.path}`)
      console.log(`   Components imported: ${fileData.imports.length}`)
      console.log(`   Total usage count: ${fileData.totalComponents}`)
      console.log(`   Imported: ${fileData.imports.join(', ')}`)

      console.log('   Usage breakdown:')
      Array.from(fileData.componentUsage.entries()).forEach(
        ([component, usage]) => {
          console.log(`     ${component}: ${usage.total} times`)
        }
      )
    })

    // Export data option
    await this.generateJSONReport()
  }

  /**
   * Read package.json and extract project information
   */
  getPackageInfo() {
    try {
      const packageJsonPath = path.join(
        this.originalWorkingDirectory,
        'package.json'
      )
      const packageContent = fs.readFileSync(packageJsonPath, 'utf-8')
      const packageJson = JSON.parse(packageContent)
      return {
        name: packageJson.name || 'Unknown Project',
        version: packageJson.version || '1.0.0',
        description: packageJson.description || 'No description available'
      }
    } catch {
      console.warn('Warning: Could not read package.json, using default values')
      return {
        name: 'Unknown Project',
        version: '1.0.0',
        description: 'No description available'
      }
    }
  }

  /**
   * Generate JSON report for programmatic usage
   */
  async generateJSONReport() {
    // Create brief summaries for DS and non‑DS components
    const dsComponentsSummary = {}
    this.componentUsage.forEach((data, component) => {
      dsComponentsSummary[component] = data.total
    })

    const nonDsComponentsSummary = {}
    this.nonSubzeroUsage.forEach((data, component) => {
      nonDsComponentsSummary[component] = data.total
    })

    // Determine the analysis path description
    const analysisPath =
      this.projectRoot === this.originalWorkingDirectory
        ? 'root'
        : path.relative(this.originalWorkingDirectory, this.projectRoot)

    // Read package.json for project information
    const packageInfo = this.getPackageInfo()

    const reportData = {
      summary: {
        projectName: packageInfo.name,
        projectVersion: packageInfo.version,
        projectDescription: packageInfo.description,
        totalFiles: this.fileAnalysis.size,
        // Separate unique component counts
        dsUniqueComponents: this.componentUsage.size,
        nonDsUniqueComponents: this.nonSubzeroUsage.size,
        // Separate usage totals
        dsTotalUsageCount: Array.from(this.componentUsage.values()).reduce(
          (sum, component) => sum + component.total,
          0
        ),
        nonDsTotalUsageCount: Array.from(this.nonSubzeroUsage.values()).reduce(
          (sum, component) => sum + component.total,
          0
        ),
        analyzedPath: analysisPath,
        analyzedAt: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        })
      },
      brief: {
        dsComponentsUsed: this.componentUsage.size,
        nonDsComponentsUsed: this.nonSubzeroUsage.size,
        dsComponents: dsComponentsSummary,
        nonDsComponents: nonDsComponentsSummary,
        dsComponentsArray: Array.from(this.componentUsage.keys()).sort(),
        nonDsComponentsArray: Array.from(this.nonSubzeroUsage.keys()).sort()
      }
      // INFO: commenting currently for smaller audit
      // details: {
      //   dsComponents: Object.fromEntries(this.componentUsage),
      //   nonDsComponents: Object.fromEntries(this.nonSubzeroUsage),
      //   files: Object.fromEntries(
      //     Array.from(this.fileAnalysis.entries()).map(([path, data]) => [
      //       path,
      //       {
      //         path: data.path,
      //         imports: data.imports,
      //         componentUsage: Object.fromEntries(data.componentUsage),
      //         totalComponents: data.totalComponents
      //       }
      //     ])
      //   )
      // }
    }

    const reportPath = path.join(
      this.originalWorkingDirectory,
      'design-system-usage-report.json'
    )
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2))

    console.log('\n💾 JSON Report Generated')
    console.log('─'.repeat(40))
    console.log(`Report saved to: ${reportPath}`)
    console.log(
      'This file contains detailed usage data for programmatic analysis.'
    )

    await this.uploadReportIfEnabled(reportData)
  }

  getEnvBoolean(name) {
    const value = (process.env[name] || '').toLowerCase().trim()
    return value === '1' || value === 'true' || value === 'yes'
  }

  getGoogleUploadMode() {
    const mode = (process.env.DS_USAGE_GOOGLE_UPLOAD_MODE || '')
      .toLowerCase()
      .trim()

    if (mode === 'apps-script' || mode === 'sheets-api') {
      return mode
    }

    if (process.env.GOOGLE_APPS_SCRIPT_URL) {
      return 'apps-script'
    }

    return 'sheets-api'
  }

  async uploadReportIfEnabled(reportData) {
    const uploadEnabled = this.getEnvBoolean('DS_USAGE_UPLOAD_TO_GOOGLE')
    if (!uploadEnabled) {
      return
    }

    try {
      const mode = this.getGoogleUploadMode()

      if (mode === 'apps-script') {
        await this.uploadViaAppsScript(reportData)
      } else {
        await this.uploadViaSheetsApi(reportData)
      }
    } catch (error) {
      console.warn(
        `⚠️  Google upload failed: ${error instanceof Error ? error.message : error}`
      )
    }
  }

  async uploadViaAppsScript(reportData) {
    const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_URL
    if (!webhookUrl) {
      throw new Error('GOOGLE_APPS_SCRIPT_URL is required for apps-script mode')
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData),
      signal: AbortSignal.timeout(15000)
    })

    if (!response.ok) {
      const message = await response.text()
      throw new Error(
        `Apps Script upload error (${response.status}): ${message}`
      )
    }

    console.log('☁️  Uploaded usage report via Google Apps Script')
  }

  getServiceAccountPrivateKey() {
    if (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
      return process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(
        /\\n/g,
        '\n'
      )
    }

    if (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_BASE64) {
      return Buffer.from(
        process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_BASE64,
        'base64'
      ).toString('utf-8')
    }

    return ''
  }

  base64UrlEncode(input) {
    const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input)
    return buffer
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  }

  createSignedJwt(serviceAccountEmail, privateKey) {
    const now = Math.floor(Date.now() / 1000)
    const payload = {
      iss: serviceAccountEmail,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600
    }

    const header = { alg: 'RS256', typ: 'JWT' }

    const encodedHeader = this.base64UrlEncode(JSON.stringify(header))
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload))
    const signingInput = `${encodedHeader}.${encodedPayload}`

    const signer = crypto.createSign('RSA-SHA256')
    signer.update(signingInput)
    signer.end()

    const signature = signer.sign(privateKey)
    const encodedSignature = this.base64UrlEncode(signature)

    return `${signingInput}.${encodedSignature}`
  }

  async getGoogleAccessToken(serviceAccountEmail, privateKey) {
    const assertion = this.createSignedJwt(serviceAccountEmail, privateKey)

    const body = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    })

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(15000)
    })

    if (!response.ok) {
      const message = await response.text()
      throw new Error(`Token request failed (${response.status}): ${message}`)
    }

    const data = await response.json()
    if (!data.access_token) {
      throw new Error('Token response missing access_token')
    }

    return data.access_token
  }

  getDesignSystemPackageVersion() {
    try {
      const pkgPath = path.join(
        this.originalWorkingDirectory,
        'node_modules',
        '@am92',
        'react-design-system',
        'package.json'
      )
      const pkgContent = fs.readFileSync(pkgPath, 'utf-8')
      const pkg = JSON.parse(pkgContent)
      return pkg.version || 'unknown'
    } catch (error) {
      return 'unknown'
    }
  }

  buildGoogleSheetRows(reportData) {
    const dsVersion = this.getDesignSystemPackageVersion()
    const componentDetails = Array.from(this.componentUsage.entries()).sort(
      ([a], [b]) => a.localeCompare(b)
    )

    return componentDetails.map(([component, data]) => [
      reportData.summary.projectName,
      reportData.summary.projectVersion,
      dsVersion,
      component,
      data.jsx,
      data.function,
      data.total,
      data.files.length,
      reportData.summary.analyzedAt
    ])
  }

  buildSummaryRow(reportData) {
    const dsVersion = this.getDesignSystemPackageVersion()
    const totalUsage = Array.from(this.componentUsage.values()).reduce(
      (sum, component) => sum + component.total,
      0
    )
    return [
      [
        reportData.summary.projectName,
        reportData.summary.projectVersion,
        dsVersion,
        Array.from(this.componentUsage.keys()).length,
        totalUsage,
        this.fileAnalysis.size,
        reportData.summary.analyzedAt
      ]
    ]
  }

  buildAnalyticsData(reportData) {
    const topComponents = Array.from(this.componentUsage.entries())
      .sort(([, a], [, b]) => b.total - a.total)
      .slice(0, 20)

    return topComponents.map(([component, data], index) => [
      index + 1,
      component,
      data.total,
      data.jsx,
      data.function,
      data.files.length,
      reportData.summary.projectName,
      reportData.summary.projectVersion,
      reportData.summary.analyzedAt
    ])
  }

  async seedAnalyticsFormulas(spreadsheetId, accessToken) {
    // Check if Analytics sheet already has content (formulas already seeded)
    const checkUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      spreadsheetId
    )}/values/Analytics!A1:A1`

    const checkResponse = await fetch(checkUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(15000)
    })

    if (!checkResponse.ok) return

    const checkData = await checkResponse.json()
    if (checkData.values && checkData.values.length > 0) return // already seeded

    // Seed Analytics!A1 with a QUERY formula that aggregates live from Data sheet.
    // Columns in Data: A=Project, B=ProjVersion, C=DSVersion, D=Component,
    //                  E=JSX, F=Function, G=Total, H=Files, I=Timestamp
    // Row 1 = headers | Row 2 = QUERY formula that auto-aggregates + ranks
    const headerAndFormula = [
      [
        'Rank',
        'Component',
        'Total Usage',
        'JSX Usage',
        'Function Usage',
        'Projects Used In',
        'Last Seen'
      ],
      [
        `=IFERROR(ARRAYFORMULA(IF(LEN(B2:B), RANK(C2:C, C2:C, 0), "")), "")`,
        `=IFERROR(QUERY(Data!A:I, "SELECT D, SUM(G), SUM(E), SUM(F), COUNT(A), MAX(I) WHERE D != 'Component' AND D != '' GROUP BY D ORDER BY SUM(G) DESC LABEL D '', SUM(G) '', SUM(E) '', SUM(F) '', COUNT(A) '', MAX(I) ''", 0), "No data yet — run the postinstall scan on a consumer project first.")`
      ]
    ]

    const seedUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      spreadsheetId
    )}/values/Analytics!A1?valueInputOption=USER_ENTERED`

    const seedResponse = await fetch(seedUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ values: headerAndFormula }),
      signal: AbortSignal.timeout(15000)
    })

    if (seedResponse.ok) {
      console.log(
        '✅ Analytics sheet seeded with live QUERY formula (auto-updates from Data)'
      )
    }
  }

  async createSheetsIfMissing(spreadsheetId, accessToken) {
    const sheetNames = ['Data', 'Summary', 'Analytics']
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      spreadsheetId
    )}?fields=sheets.properties.title`

    try {
      const sheetsResponse = await fetch(sheetsUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        signal: AbortSignal.timeout(15000)
      })

      if (!sheetsResponse.ok) {
        throw new Error(`Failed to get sheet list: ${sheetsResponse.status}`)
      }

      const sheetsData = await sheetsResponse.json()
      const existingSheets = (sheetsData.sheets || []).map(
        s => s.properties.title
      )

      const sheetsToCreate = sheetNames.filter(
        name => !existingSheets.includes(name)
      )

      if (sheetsToCreate.length > 0) {
        console.log(`📝 Creating missing sheets: ${sheetsToCreate.join(', ')}`)

        const requests = sheetsToCreate.map(title => ({
          addSheet: {
            properties: {
              title: title,
              gridProperties: {
                rowCount: 10000,
                columnCount: 10
              }
            }
          }
        }))

        const batchResponse = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
            spreadsheetId
          )}:batchUpdate`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ requests }),
            signal: AbortSignal.timeout(15000)
          }
        )

        if (!batchResponse.ok) {
          throw new Error(`Failed to create sheets: ${batchResponse.status}`)
        }

        console.log(`✅ Created ${sheetsToCreate.length} sheet(s)`)
      }
    } catch (error) {
      console.warn(`⚠️  Could not verify/create sheets: ${error.message}`)
    }
  }

  async ensureSheetHeadersExist(spreadsheetId, accessToken) {
    // Check if Data sheet has headers
    const headerConfigs = [
      {
        sheet: 'Data',
        headers: [
          'Project Name',
          'Project Version',
          'DS Version',
          'Component',
          'JSX Usage',
          'Function Usage',
          'Total Usage',
          'Files Used',
          'Timestamp'
        ]
      },
      {
        sheet: 'Summary',
        headers: [
          'Project Name',
          'Project Version',
          'DS Version',
          'Unique Components',
          'Total Usage',
          'Files Analyzed',
          'Timestamp'
        ]
      }
    ]

    for (const config of headerConfigs) {
      try {
        const checkUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
          spreadsheetId
        )}/values/${config.sheet}!A1:A1`

        const checkResponse = await fetch(checkUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          signal: AbortSignal.timeout(15000)
        })

        if (!checkResponse.ok) {
          console.warn(`⚠️  Could not check ${config.sheet} sheet`)
          continue
        }

        const data = await checkResponse.json()
        const hasHeaders = data.values && data.values.length > 0

        if (!hasHeaders) {
          const headerUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
            spreadsheetId
          )}/values/${config.sheet}!A1?valueInputOption=RAW`

          const headerResponse = await fetch(headerUrl, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ values: [config.headers] }),
            signal: AbortSignal.timeout(15000)
          })

          if (headerResponse.ok) {
            console.log(`✅ Added headers to ${config.sheet} sheet`)
          }
        }
      } catch (error) {
        console.warn(
          `⚠️  Could not ensure headers for ${config.sheet}: ${error.message}`
        )
      }
    }
  }

  async uploadToSheet(
    spreadsheetId,
    sheetName,
    rows,
    accessToken,
    startRow = 'A2'
  ) {
    if (rows.length === 0) {
      console.log(`ℹ️  No rows to upload to ${sheetName} sheet`)
      return 0
    }

    const range = `${sheetName}!${startRow}`
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
      spreadsheetId
    )}/values/${encodeURIComponent(
      range
    )}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ values: rows }),
      signal: AbortSignal.timeout(15000)
    })

    if (!response.ok) {
      const message = await response.text()
      throw new Error(
        `Upload to ${sheetName} failed (${response.status}): ${message}`
      )
    }

    const responseData = await response.json()
    const uploadedRows = responseData.updates?.updatedRows || rows.length
    console.log(`✨ Uploaded ${uploadedRows} rows to ${sheetName} sheet`)
    return uploadedRows
  }

  async uploadViaSheetsApi(reportData) {
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const privateKey = this.getServiceAccountPrivateKey()

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SPREADSHEET_ID is required for sheets-api mode')
    }

    if (!serviceAccountEmail) {
      throw new Error(
        'GOOGLE_SERVICE_ACCOUNT_EMAIL is required for sheets-api mode'
      )
    }

    if (!privateKey) {
      throw new Error(
        'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_BASE64 is required for sheets-api mode'
      )
    }

    const dsVersion = this.getDesignSystemPackageVersion()

    console.log(`📋 Google Sheets upload config:`)
    console.log(`   Spreadsheet ID: ${spreadsheetId}`)
    console.log(`   Service Account: ${serviceAccountEmail}`)
    console.log(`   Design System Version: ${dsVersion}`)

    const accessToken = await this.getGoogleAccessToken(
      serviceAccountEmail,
      privateKey
    )
    console.log(`✅ Got access token from Google`)

    // Create sheets if missing, then seed Analytics with live formulas
    await this.createSheetsIfMissing(spreadsheetId, accessToken)
    await this.ensureSheetHeadersExist(spreadsheetId, accessToken)
    await this.seedAnalyticsFormulas(spreadsheetId, accessToken)

    // Prepare data
    const componentRows = this.buildGoogleSheetRows(reportData)
    const summaryRows = this.buildSummaryRow(reportData)

    if (componentRows.length === 0) {
      console.log('ℹ️  No component usage data to upload')
      return
    }

    console.log(`📤 Uploading to sheets...`)
    console.log(`   Data: ${componentRows.length} rows`)
    console.log(`   Summary: ${summaryRows.length} row`)
    console.log(`   Analytics: auto-computed via formula (no upload needed)`)

    // Upload to Data sheet
    await this.uploadToSheet(spreadsheetId, 'Data', componentRows, accessToken)

    // Upload to Summary sheet
    await this.uploadToSheet(spreadsheetId, 'Summary', summaryRows, accessToken)

    console.log(
      '☁️  Uploaded to Data + Summary sheets. Analytics updates automatically.'
    )
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Postinstall entry point
//
// Resolves the consumer project root using npm lifecycle env vars so the
// script scans the consumer's project, not this library's own source.
// Always exits with code 0 so a scan error never blocks the install.
// ─────────────────────────────────────────────────────────────────────────────

function resolveConsumerRoot() {
  // INIT_CWD is set by npm/pnpm/yarn to the directory where install was run
  const initCwd = process.env.INIT_CWD
  if (initCwd && fs.existsSync(path.join(initCwd, 'package.json'))) {
    return path.resolve(initCwd)
  }

  const localPrefix = process.env.npm_config_local_prefix
  if (localPrefix && fs.existsSync(path.join(localPrefix, 'package.json'))) {
    return path.resolve(localPrefix)
  }

  return process.cwd()
}

function showHelp() {
  console.log(`📊 Design System Usage Analyzer
═══════════════════════════════

Analyzes usage of @am92/react-design-system components in your project.

Usage:
  node analyze-design-system-usage.js [path] [options]

Arguments:
  path          Directory to analyze (optional, defaults to current directory)

Options:
  --help, -h    Show this help message

Examples:
  node analyze-design-system-usage.js              # Analyze entire project
  node analyze-design-system-usage.js src          # Analyze src directory only
  node analyze-design-system-usage.js src/Components  # Analyze Components only

Features:
  ✅ Accurate component counting (excludes imports and closing tags)
  ✅ Detailed file-by-file breakdown
  ✅ JSON export for programmatic analysis
  ✅ Differentiates JSX usage from function/type usage

The script generates two outputs:
  1. Console report with summary and detailed breakdown
  2. JSON file (design-system-usage-report.json) for programmatic use`)
}

// Check if invoked as a manual CLI command or as postinstall
const isManualRun =
  process.argv[2] ||
  process.argv.includes('--help') ||
  process.argv.includes('-h')

if (isManualRun) {
  // Manual CLI usage — mirrors original script behaviour exactly
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    showHelp()
    process.exit(0)
  }

  const targetPath = process.argv[2] || process.cwd()
  const absolutePath = path.resolve(targetPath)

  if (!fs.existsSync(absolutePath)) {
    console.error(`❌ Error: Path "${targetPath}" does not exist.`)
    process.exit(1)
  }

  if (!fs.statSync(absolutePath).isDirectory()) {
    console.error(`❌ Error: "${targetPath}" is not a directory.`)
    process.exit(1)
  }

  console.log(`🎯 Target path: ${absolutePath}`)
  const analyzer = new DesignSystemAnalyzer(absolutePath)
  analyzer.analyze().catch(err => {
    console.error(
      `❌ Manual usage scan failed: ${err instanceof Error ? err.message : err}`
    )
    process.exit(1)
  })
} else {
  // Postinstall — resolve consumer root and never fail install
  try {
    const consumerRoot = resolveConsumerRoot()
    const srcPath = path.join(consumerRoot, 'src')
    const scanPath =
      fs.existsSync(srcPath) && fs.statSync(srcPath).isDirectory()
        ? srcPath
        : consumerRoot
    console.log(`🎯 Target path: ${scanPath}`)
    const analyzer = new DesignSystemAnalyzer(scanPath, consumerRoot)
    analyzer.analyze().catch(err => {
      console.warn(
        `⚠️  @am92/react-design-system postinstall scan skipped: ${err.message}`
      )
    })
  } catch (err) {
    console.warn(
      `⚠️  @am92/react-design-system postinstall scan skipped: ${err.message}`
    )
  }
}

export default DesignSystemAnalyzer
