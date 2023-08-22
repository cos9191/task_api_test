/*
 * Этап 1.
 * Вам необходимо создать класс ApiRequester, который будет выполнять запросы
 * к удаленному API с помощью fetch и возвращать промис типа ApiResponse.
 * Если произошла ошибка при выполнении запроса,
 * промис должен быть отклонен с соответствующей ошибкой.
 *
 * Этап 2.
 * Модифицировать класс ApiRequester так, чтобы при выполнении запроса более 3-х секунд,
 * он был отклонен и возвращал ошибку Request timed out
*/

import { useState } from 'react'

interface ApiResponse {
    data: any;
    status: number;
}

export function useApi () {

    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState('')
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)

    async function fetchData(
        url: string,
        timeout: number = 3000,
        loaderShowTime: number = 1000,
        method: string = 'GET',
        timeoutText: string = 'Request timed out',
    ) {
        try {
            setApiError('')
            setIsLoading(true)

            const responsePromise = new Promise<Response>((resolve, reject) => {
                fetch(url, {
                    method: method,
                })
                    .then(response => {
                        setTimeout(() => {
                            resolve(response)
                        }, loaderShowTime)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
            const timeoutPromise = new Promise<Response>((_, reject) =>
                setTimeout(() => reject(new Error(timeoutText)), timeout)
            )
            const response  = await Promise.race([responsePromise, timeoutPromise])

            if (!response.ok) {
                throw new Error(`HTTP error, Status: ${response.status}`)
            }

            setApiResponse ({
                data: await response.json(),
                status: response.status
            })

            setIsLoading(false)

        } catch (err: any) {
            setIsLoading(false)
            setApiError(err.message)
        }
    }

    return { fetchData, apiResponse, isLoading, apiError }
}
