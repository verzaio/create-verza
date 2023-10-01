import { Box } from "@verza/sdk/react";
import { initReactEngine } from "@verza/sdk/react/client";

export default async function script(id) {
  const [render] = await initReactEngine(id);

  render(
    <Box color="red" radius={0.05} position={[0, 2, 2]}  collision="static" />
  );
}
