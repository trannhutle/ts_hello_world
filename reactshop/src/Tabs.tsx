import * as React from "react";

interface IState {
  activeName: string;
  activeContent: React.ReactNode;
}
interface ITabProps {
  name: string;
  initialActive?: boolean;
  heading: () => string | JSX.Element;
}
interface ITabsContext {
  activeName?: string;
  handleTabClick?: (name: string, content: React.ReactNode) => void;
}
const TabsContext = React.createContext<ITabsContext>({});

class Tabs extends React.Component<{}, IState> {
  public static Tab: React.SFC<ITabProps> = (props) => (
    <TabsContext.Consumer>
      {(context: ITabsContext) => {
        /* 
        We don't have any code to render the content when the tabs initially load
        Invoke the tab click handler if there is no active tab in the context 
        and the tab is flagged as initially active.

        In this case, we return null because invoking the tab click will set the state for the active tab,
        which will cause another rendering cycle.
        */
        if (!context.activeName && props.initialActive) {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
            return null;
          }
        }
        const activeName = context.activeName
          ? context.activeName
          : props.initialActive
          ? props.name
          : "";
        const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children);
          }
        };
        return (
          <li
            onClick={handleTabClick}
            className={props.name === activeName ? "active" : ""}
          >
            {props.heading()}
          </li>
        );
      }}
    </TabsContext.Consumer>
  );

  public constructor(props: {}) {
    super(props);
  }
  private handleTabClick = (name: string, content: React.ReactNode) => {
    this.setState({ activeName: name, activeContent: content });
  };
  public render() {
    return (
      <TabsContext.Provider
        value={{
          activeName: this.state ? this.state.activeName : "",
          handleTabClick: this.handleTabClick,
        }}
      >
        <ul className="tabs">{this.props.children}</ul>
        <div>{this.state && this.state.activeContent}</div>
      </TabsContext.Provider>
    );
  }
}
export default Tabs;
