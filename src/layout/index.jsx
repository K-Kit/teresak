import React from "react";
import Helmet from "react-helmet";
import config from "../../data/SiteConfig";
import "./index.css";
import { Global } from '@emotion/core'

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
         <Global
    styles={theme => ({
      body: {
        color: theme.colors.text,
        backgroundColor: theme.colors.background,
      }
    })}
  />
        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <html lang="en" />
        </Helmet>
        {children}
      </div>
    );
  }
}
