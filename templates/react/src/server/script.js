import { Command, initEngine } from "@verza/sdk";

export default async function script() {
  const engine = await initEngine({
    accessToken: "ACCESS_TOKEN",
  });

  engine.commands.register(
    new Command("server").on((player) => {
      player.sendMessage("Hello from server!");
    })
  );

  return engine;
}
