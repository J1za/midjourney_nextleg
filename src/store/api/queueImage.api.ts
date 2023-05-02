import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH_TOKEN } from '@/services/core/nextLeg';

export const queueImageApi = createApi({
    reducerPath: 'queueImageApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.thenextleg.io/v2/', headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`,
            'Content-Type': 'application/json'
        },
    }),
    endpoints: (builder) => ({
        getListQueue: builder.query<any, { messageId: string }>({
            query: (el) => `message/${el.messageId}`,
        }),
    }),
})

export const { useGetListQueueQuery } = queueImageApi