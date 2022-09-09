import * as React from 'react';
import Typography from '@mui/material/Typography';
// import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Pagination from 'react-bootstrap/Pagination';
import Link from 'next/link';

export default function PaginationControlled({  page, size=5, countInEachPage = 20, source_url, extra_query={} }) {
  let active = +page;
  let items = [];
  const {slug, ...query} = extra_query
  for (let number = 1; number <= Math.ceil(size / countInEachPage); number++) {
    items.push(
          <Link href={{pathname: source_url, query: {...query, page: number}}} passHref>
      <Pagination.Item key={number} active={number === active} >
          {number}
          {/* <Link ></Link> */}
        </Pagination.Item>
      </Link>
      
    );
  }
  return (
    <Pagination className='d-flex justify-content-center' dir="ltr">{items}</Pagination>
    )
}