import React from "react";
import { StateToProps, DispatchToProps } from "./worker-hand.container";
import { WorkerHandStyles } from "./worker-hand.styles";

interface OwnProps {}

// Props should be a combination of StateToProps, DispatchToProps, and OwnProps
type Props = StateToProps & DispatchToProps & OwnProps;

export default class workerHand extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <WorkerHandStyles></WorkerHandStyles>;
  }
}
