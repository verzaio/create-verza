import { initEngine } from "@verza/sdk";

export default async function script(id: string) {
  const engine = await initEngine(id);

  engine.objects.create("box", {
    color: "red",
    radius: 0.05,
    position: [0, 2, 2],
    collision: "static",
  });
}
