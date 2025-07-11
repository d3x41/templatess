import { Output, Services } from "~templates-utils";
import { Input } from "./meta";

export function generate(input: Input): Output {
  const services: Services = [];

  services.push({
    type: "app",
    data: {
      serviceName: input.appServiceName,
      source: {
        type: "image",
        image: input.appServiceImage,
      },
      domains: [
        {
          host: "$(EASYPANEL_DOMAIN)",
          port: 8096,
        },
      ],
      env: [`PUID=1000`, `PGID=1000`, `TZ=Etc/UTC`].join("\n"),
      mounts: [
        {
          type: "volume",
          name: "tvshows",
          mountPath: "/data/tvshows",
        },
        {
          type: "volume",
          name: "movies",
          mountPath: "/data/movies",
        },
        {
          type: "volume",
          name: "config",
          mountPath: "/config",
        },
      ],
    },
  });

  return { services };
}
