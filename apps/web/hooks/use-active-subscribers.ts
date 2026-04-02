import { useState, useEffect, useContext } from "react";
import { FetchBuilder } from "@courselit/utils";
import { AddressContext } from "@components/contexts";

interface SubscribersData {
    count: number;
    growth: number;
}

export function useActiveSubscribers(duration: string) {
    const address = useContext(AddressContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SubscribersData>({
        count: 0,
        growth: 0,
    });

    useEffect(() => {
        const getData = async () => {
            const query = `
                query getActiveSubscribersCount($duration: DurationType!) {
                    subscribers: getActiveSubscribersCount(duration: $duration) {
                        count
                        growth
                    }
                }
            `;

            const fetch = new FetchBuilder()
                .setUrl(`${address.backend}/api/graph`)
                .setPayload({
                    query,
                    variables: {
                        duration: `_${duration.toUpperCase()}`,
                    },
                })
                .setIsGraphQLEndpoint(true)
                .build();

            try {
                setLoading(true);
                const response = await fetch.exec();
                if (response.subscribers) {
                    setData({
                        count: response.subscribers.count,
                        growth: response.subscribers.growth,
                    });
                }
            } catch (err: any) {
                // silently fail
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [duration, address.backend]);

    return { data, loading };
}
