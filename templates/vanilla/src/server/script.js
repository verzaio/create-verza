import { Command, initEngine } from "@verza/sdk";

export default async function script() {
  const VERZA_TOKEN = process.env.VERZA_TOKEN;

  const engine = await initEngine({
    accessToken: VERZA_TOKEN,
  });

  engine.commands.register(
    new Command("server").on((player) => {
      player.sendMessage("Hello from server!");
    })
  );

  return engine;
}
