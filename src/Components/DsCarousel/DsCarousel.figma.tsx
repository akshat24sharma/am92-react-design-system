import React from "react";
import figma from "@figma/code-connect";
import { DsCarousel } from "./DsCarousel.Component";
import { DsBox } from "../DsBox";

figma.connect(
  DsCarousel,
  "https://www.figma.com/design/9o1qfErgy23YgsDzoaXpw7/Subzero-V.2.0-Design-System?node-id=16093-296&m=dev",
  {
    props: {
      paginationMode: figma.enum("⚙️ Variant", {
        "Internal content slider": "internal",
        "External content slider": "external",
      }),
      children: figma.children("*"),
      // Add autoplay type based on the Type property from content_slider layer
      autoplayType: figma.nestedProps("content_slider", {
        type: figma.enum("⚙️ Type", {
          Default: false,
          Timed: true,
        }),
      }),
      noOfChildren: figma.nestedProps("content_slider", {
        child: figma.enum("🔢 Number", {
          "2": 2,
          "3": 3,
          "4": 4,
          "5": 5,
          "6": 6,
        }),
      }),
    },
    example: (props) => (
      <DsCarousel
        pagination={{
          mode: props.paginationMode,
        }}
        autoplay={props.autoplayType?.type}
        navigation={{
          enabled: true,
        }}
      >
        {/* Render number of children based on requirement */}
        <DsBox>Slide 1</DsBox>
      </DsCarousel>
    ),
  }
);
