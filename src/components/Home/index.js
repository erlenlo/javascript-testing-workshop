import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import api from '../../api';
import { connect } from 'react-redux';
import { HOME_PAGE_LOADED } from '../../constants/actionTypes';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (tab, payload) => dispatch({ type: HOME_PAGE_LOADED, tab, payload }),
});

class Home extends React.Component {
  async componentDidMount() {
    const tab = 'all';
    this.props.onLoad(tab, await api.Articles.all());
  }

  render() {
    return (
      <div className="home-page">
        <Banner appName={this.props.appName} />

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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
