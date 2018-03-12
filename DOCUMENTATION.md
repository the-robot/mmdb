Documentation
===

## **1. Movie**
### **Reducer**
- `movieReducer.jsx`

| Variable | Type | Description | Action (.jsx) |
|:--------:|:----:|:-----------:|:-:|
| overview | json | movie overall general information | movieAction |
| trailer | string | youtube trailer id | trailerAction |
| cast | array | cast information of given movie | castAction |
| reviews | json | movie review information | reviewsAction |

<br/>

### **Actions**
**movieAction.jsx**
- get the movie overall information from given movie id
- returns the result in json format
```c
// event : FETCH_MOVIE_FULFILLED
fetch(int movieID) => json

// event : RESET_MOVIE_DATA
reset()
```
<br/>

**trailerAction.jsx**
- get the youtube trailer id from given movie id
- returns a string of id
```c
getTrailer(int movieID) => string
```
<br/>

**castAction.jsx**
- get the cast information of given movie id and returns an array.
```c
// event : FETCH_MOVIE_CAST_FULFILLED
getCast(int movieID) => array
```
<br/>

**reviewsAction.jsx**
- get the reviews from given movie id
- returns the result in json format if successful or dispatch `no-more` event if all reviews are fetched
```c
// event : FETCH_MOVIE_REVIEWS_FULFILLED
//         FETCH_MOVIE_REVIEWS_NOMORE
getReviews(int movieID, int pageNumber) => json
```
<br/>

---

