import React from "react";
import "./Settings.css";

interface IProps {}

interface IState {}

export default class Settings extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return <div className="settings">Settings</div>;
    }
}
