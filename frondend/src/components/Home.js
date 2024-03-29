import React, { Fragment, useEffect, useState } from 'react'

import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader' 

import SliderTooltip from 'rc-slider'
// import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import Pagination from 'react-js-pagination'
import {useDispatch, useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import { getProducts} from '../actions/productActions';

// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider.Range)

const Home = ({match}) => {

  const [currentPage, setCurrentPage] = useState(1) 
  const [price, setPrice] = useState([1, 1000])
  const [category, setCategory] = useState('')

  const categories = [
    'Sách văn học',
    'Sách kinh tế',
    'Sách kỹ năng sống',
    'Sách Học Ngoại Ngữ',
    'Sách Kiến Thức Tổng Hợp',
    'Sách Lịch sử'
  ]

  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading, products, error, productsCount, resPerPage, filteredProductsCount} = useSelector(state => state.products)

  const keyword = match.params.keyword 

  useEffect(() => {
    
    if (error) {
      return alert.error(error)
    }
    dispatch(getProducts(keyword, currentPage, price, category));
  }, [dispatch, alert, error, keyword, currentPage, price, category]);

  function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber)
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount
  }

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Buy best products online'} />
          <div className="container container-fluid">
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-5">
              <div className="row">
                {keyword ? (
                  <Fragment>
                    <div className="col-6 col-md-3 mt-5 mb-5">
                      <div className="px-5">
                        {/* <Range  */}
                        <SliderTooltip>
                          marks={{
                            1: `$1`,
                            1000: `$1000`
                          }}
                          min={1}
                          max={1000}
                          defaultValue={[1, 1000]}
                          tipFormatter={value => `$${value}`}
                          tipProps={{
                            placement: "top",
                            visible: true
                          }}
                          value={price}
                          onChange={price => setPrice(price)}
                        {/* /> */}
                        </SliderTooltip>

                        <hr className="my-5" />
                        <div className="mt-5">
                          <h4 className="mb-3">
                            categories
                          </h4>

                          <ul className="pl-0">
                            {categories.map(category => (
                              <li
                                style={{cursor: 'pointer',
                                  listStyleType: 'none'
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                              >

                              </li>
                            ))}
                          </ul>

                        </div>

                      </div>
                    </div>

                    <div className="col-6">
                      <div className="row">
                        {
                          products && products.map(product => ( 
                            <Product key={product._id} product={product} col={4} />
                          ))
                        }
                      </div>
                    </div>

                  </Fragment>
                ): (
                  products && products.map(product => ( 
                  <Product key={product._id} product={product} col={3} />
                  ))
                )}

                
              </div>
            </section>
          </div>

          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
            <Pagination>
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={productsCount} 
              onChange={setCurrentPageNo} 
              nextPageText={'Next'}
              prevPageText={'Prev'}
              firstPageText={'First'}
              lastPageText={'Last'}
              itemClass="page-item"
              linkClass="page-link"
            </Pagination>
          </div>
          )}

        </Fragment>
      )}
    </Fragment>
  )
}

export default Home
