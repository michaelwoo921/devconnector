import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { getGithubRepos } from '../../actions/profile'

const ProfileGithub = ({username, getGithubRepos, profile:{repos}}) => {
  console.log('***',username)

  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username])
  console.log(repos)
  return (

    <div className="profile-github">
    <h2 className="text-primary my-1">
      <i className="fab fa-github"></i> Github Repos
    </h2>
    {repos.slice(0,4).map(repo => (
          <div key= {repo.id} className="repo bg-white p-1 my-1">
          <div>
            <h4><a href={repo.html_url} target="_blank"
                rel="noopener noreferrer">{repo.name}</a></h4>
            <p>
              {repo.description}
            </p>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
              <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
              <li className="badge badge-light">Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
    ))}


  </div>
  )
}
const mapStateToProps = state => ({
  profile: state.profile
})
export default connect(mapStateToProps, {getGithubRepos})(ProfileGithub)