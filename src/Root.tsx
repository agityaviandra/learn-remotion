import { Composition } from "remotion";
import { MacTerminal } from "./MacTerminal";
import { MasterComposition } from "./MasterComposition";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Master"
        component={MasterComposition}
        durationInFrames={180}
        fps={30}
        width={1280}
        height={700}
      />
      <Composition
        id="MacTerminal"
        component={MacTerminal}
        durationInFrames={180}
        fps={30}
        width={1280}
        height={700}
        defaultProps={{
          promptText: ""
        }}
      />
    </>
  );
};
