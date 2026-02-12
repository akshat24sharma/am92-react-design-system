import { __unsafe_useEmotionCache } from '@emotion/react';

export const useEmotionNonce = (): string | undefined => {
    const cache = __unsafe_useEmotionCache();
    return cache?.nonce;
};
