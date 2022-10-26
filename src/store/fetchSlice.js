import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Octokit } from 'octokit';

export const gitUserRequest = createAsyncThunk(
  'user/gitUserRequest',
  async function (username, { rejectWithValue }) {
    const octokit = new Octokit({
      auth: process.env.REACT_APP_API_KEY,
    });
    try {
      const user = await octokit.request('GET /users/{username}', {
        username: username,
      });

      console.log({
        login: user.data.login,
        name: user.data.name,
        avatar: user.data.avatar_url,
      });

      const repos = await octokit.request('GET /users/{username}/repos', {
        username: username,
      });

      console.log(
        repos.data.map((repo) => ({
          name: repo.name,
          language: repo.language,
          description: repo.description,
          stars: repo.stargazers_count,
        }))
      );

      return {
        login: user.data.login,
        name: user.data.name,
        avatar: user.data.avatar_url,
        repos: repos.data.map((repo) => ({
          name: repo.name,
          language: repo.language,
          description: repo.description,
          stars: repo.stargazers_count,
        })),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const gitCommitRequest = createAsyncThunk(
  'user/gitCommitRequest',
  async function (data, { rejectWithValue }) {
    const user = data.login
    const repo = data.repo
    const octokit = new Octokit({
      auth: process.env.REACT_APP_API_KEY,
    });

    try {
      const commits = await octokit.request(
        'GET /repos/{username}/{repo}/commits',
        {
          username: user,
          repo: repo,
        }
      );
      console.log(commits)
      return commits.data.map((commit) => ({
        sha: commit.sha,
        name: commit.commit.author.name,
        date: commit.commit.author.date,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchSlice = createSlice({
  name: 'user',
  initialState: {
    status: null,
    error: null,
    user: {},
    commits: {}
  },
  reducers: {},
  extraReducers: {
    [gitUserRequest.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [gitUserRequest.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.user = action.payload;
    },
    [gitUserRequest.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [gitCommitRequest.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [gitCommitRequest.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.commits = action.payload;
    },
    [gitCommitRequest.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});


export default fetchSlice.reducer;

