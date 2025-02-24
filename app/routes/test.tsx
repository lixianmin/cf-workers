import type { LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ context, params }) => {
    const { env, cf, ctx } = context.cloudflare;
    let image_url = await env.KV.get("IMAGE_URL");
    if (!image_url) {
        image_url = 'https://intaf-image.xiaoice.com/publicresource/island/default_islander/樱井莉娜.png'
        await env.KV.put("IMAGE_URL", image_url, {
            expirationTtl: 60,
        });
    }

    return Response.json({ image_url })
};

// export default function Index() {
//     const results = useLoaderData<typeof loader>();
//     return (
//         <div>
//             <h1>Welcome to Remix</h1>
//             <div>
//                 A value from D1:
//                 <pre>{JSON.stringify(results)}</pre>
//             </div>
//         </div>
//     );
// }