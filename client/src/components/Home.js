import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getPostsBySearch } from '../redux/actions/posts'
import Posts from './posts/Posts';
import Form from './Form/Form';
import Pagination from './Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0)//whey how tu set ID with react only
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([])
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');



  const isAuth = useSelector(user => user?.auth)
  console.log(isAuth)

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }))//cant pass arrey, then use join to pass as string
      history.push(`/search?searchQuery+${search || 'none'}&tags=${tags.join(',')}`)
    } else {
      history.push('/')
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost()
    }
  }

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))


  return (
    <>
      <Grow in>
        <Container maxWidth="xl">
          <Grid container className={classes.mainContainer} justifyContent='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                <TextField name='search' variant='outlined'
                  label='Search Memories'
                  onKeyPress={handleKeyPress}
                  fullWidth value={search}
                  onChange={(e) => setSearch(e.target.value)} />
                <ChipInput style={{ margin: '10px 0px' }} value={tags} onAdd={handleAdd} onDelete={handleDelete} label='Search Tags' variant='outlined' />
                <Button onClick={searchPost} className={classes.searchButton} color='primary' variant='contained'>Search</Button>
              </AppBar>
              <Form setCurrentId={setCurrentId} currentId={currentId} />
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
}

export default Home;
