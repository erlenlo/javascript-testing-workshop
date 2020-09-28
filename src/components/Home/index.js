import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import Tags from './Tags';
import api from '../../api';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from '../../constants/actionTypes';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, payload }),
  onLoad: (tab, payload) => dispatch({ type: HOME_PAGE_LOADED, tab, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
});

class Home extends React.Component {
  async componentDidMount() {
    const tab = 'all';
    this.props.onLoad(tab, await api.Articles.all());
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">
        <Banner token={this.props.token} appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">
                <Link
                  to="/editor"
                  className="btn btn-outline-primary w-100 mb-4"
                >
                  Add article <i className="ion-ios-plus-empty" />
                </Link>

                <h5>Popular Tags</h5>

                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
