'use client';

import React from 'react';

interface DeferredMountProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function DeferredMount({ children }: DeferredMountProps) {
    return <>{children}</>;
}
