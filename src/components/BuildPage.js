import React from 'react';
import { getBuildsDataFromPath, getBuildsDataByDefinition } from '../api/buildsUrls';
import { formatDistance } from 'date-fns';

class BuildPage extends React.Component {
  constructor() {
    super();
    this.state = {
      definitionsData: [],
      buildsData: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getBuildsDataFromPath(this.props.path).then(data => {
      this.setState({ definitionsData: data.value }, () => {
        const definitionIds = this.state.definitionsData.map(
          definition => definition.id
        );

        getBuildsDataByDefinition(definitionIds.join(',')).then(data => {
          this.setState({ buildsData: data.value, loading: false });
        });
      });
    });
  }

  render() {
    const builds = this.state.buildsData.map(build => {
      const definitionLink = this.state.definitionsData
        .filter(definition => definition.id === build.definition.id)
        .map(definition => definition._links.web.href);
      return (
        <div key={build.id}>
          <div
            style={{
              color:
                build.status === 'completed'
                  ? build.result === 'succeeded'
                    ? 'green'
                    : 'red'
                  : 'blue',
            }}
          >
            <a href={definitionLink}>{build.definition.name}</a>(
            <a href={build._links.web.href}>{build.buildNumber}</a>)
          </div>
          <div>status: {build.status}{' '}
            {build.status === 'completed' && formatDistance(new Date(), new Date(build.finishTime)) + ' ago'}
          </div>
          {build.status === 'completed' && <div>result: {build.result}</div>}
          <br />
        </div>
      );
    });
    return <div>{builds}</div>;
  }
}

export default BuildPage;
