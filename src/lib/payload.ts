import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

export async function getPayload() {
    return await getPayloadHMR({ config: configPromise })
}
