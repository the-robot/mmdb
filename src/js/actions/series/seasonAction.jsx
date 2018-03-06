import axios from "axios";

import getTmdbAPIKey from '../../api';
import { cleanSeasonData as clean } from '../dataProcess';

export const fetch = (id, season_number) => {
  return (dispatch) => {
    const domain = 'https://api.themoviedb.org/3/tv/';
    const url = domain + id + '/season/' + season_number
                + '?api_key=' + getTmdbAPIKey();

    axios.get(url)
      .then((response) => {
          dispatch({
            type: "FETCH_SERIES_SEASON_INFO_FULFILLED",
            payload: clean(response.data)
          });
      })

      .catch((err) => {
        dispatch({type: "FETCH_SERIES_REJECTED", payload: err});
      })
  }
}
