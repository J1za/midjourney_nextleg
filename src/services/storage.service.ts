// import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

// interface storageQueue {

// }

// class StorageService {

//     setUserBookSetting(fontSize?: number, lineHeight?: number, speed?: number): void {
//         localStorage.setItem(Storage.FONT_SIZE, fontSize?.toString() ?? '');
//         localStorage.setItem(Storage.LINE_HEIGHT, lineHeight?.toString() ?? '');
//         localStorage.setItem(Storage.SPEED_SCROLL, speed?.toString() ?? '');
//     }

//     getUserBookSetting(): any {
//         return (
//             {
//                 [Storage.FONT_SIZE]: localStorage.getItem(Storage.FONT_SIZE),
//                 [Storage.LINE_HEIGHT]: localStorage.getItem(Storage.LINE_HEIGHT),
//                 [Storage.SPEED_SCROLL]: localStorage.getItem(Storage.SPEED_SCROLL)
//             } as object

//         )
//     }

//     getUserId(): string | null {
//         return localStorage.getItem(Storage.USER_ID);
//     }

//     saveUserId(userId: string): void {
//         localStorage.setItem(Storage.USER_ID, userId);
//     }

// }

// export const storageService = new StorageService();