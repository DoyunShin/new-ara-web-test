import http from '@/http.js'
import { queryBuilder } from '@/helper.js'

export const fetchBoardList = () =>
  http.get('boards/')
    .then(({ data }) => data)

export const fetchArticles = ({ boardId, query, page, username } = {}) => {
  const context = {}
  if (boardId) context.parent_board = boardId
  if (query) context.main_search__contains = query
  if (page) context.page = page
  if (username) context.created_by__profile__nickname = username

  return http.get(`articles/?${queryBuilder(context)}`)
    .then(({ data }) => data)
}

export const fetchArchives = ({ query } = {}) => {
  const context = {}
  if (query) context.main_search__contains = query

  return http.get(`scraps/?${queryBuilder(context)}`)
    .then(({ data }) => data)
}

export const fetchArchivedPosts = (...args) =>
  fetchArchives(...args)
    .then(archive => ({
      ...archive,
      results: archive.results &&
        archive.results
          .map(({ parent_article: article }) => article)
    }))

export const fetchReports = () =>
  http.get('reports/')
    .then(({ data }) => data)
