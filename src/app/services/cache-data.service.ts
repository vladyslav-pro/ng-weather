import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    private cacheDurationSeconds = 7200;

    setCache<T>(key: string, data: T): void {
        const expiry = new Date().getTime() + this.cacheDurationSeconds * 1000;
        const cacheEntry = { data, expiry };
        localStorage.setItem(key, JSON.stringify(cacheEntry));
    }

    getCache<T>(key: string): T | null {
        const cacheEntry = localStorage.getItem(key);
        if (!cacheEntry) {
            return null;
        }

        const parsedEntry = JSON.parse(cacheEntry);
        if (parsedEntry.expiry && parsedEntry.expiry > new Date().getTime()) {
            return parsedEntry.data;
        } else {
            localStorage.removeItem(key);
            return null;
        }
    }

    removeCache(key: string): void {
        localStorage.removeItem(key);
    }
}
