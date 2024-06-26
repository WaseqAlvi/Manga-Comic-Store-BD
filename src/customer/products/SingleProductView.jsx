
import { useState ,useEffect} from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


import ProductListCustomerView from '../pages/ProductListCustomerView';




const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}


const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SingleProductView({items,setitems}) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const [ratings, setRatings] = useState([]);

  const fetchRatings = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/products/rating/${id}`);
      setRatings(response.data);
      console.log(ratings);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  useEffect(() => {
    // Fetch ratings from the API
    fetchRatings();
  }, []);


  const CID = localStorage.getItem('CID');

 





  const addToCart = () => {
    console.log('Add to cart clicked!');
    
    const selectedProduct = {
      id: newProduct.id,
      name: newProduct.productName,
      price: newProduct.price,
      quantity: newProduct.quantity,
      qty: 1,
      image : newProduct.image,
      description: newProduct.description
      // Add other necessary details
    };
  
    
    const CID = localStorage.getItem('CID');
  
    
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
  
    
    //check existing cart with that CID
    const cartItemsForCustomer = existingCartItems[CID] || [];
  
    
    cartItemsForCustomer.push(selectedProduct);
  
    
    existingCartItems[CID] = cartItemsForCustomer;
  
    
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));


    
  
    console.log(`${selectedProduct.name} added to cart for CustomerID: ${CID}!`);
  };
  

  const wishList = () => {
    console.log('Add to cart clicked!');
    
    const selectedProduct = {
      id: newProduct.id,
      name: newProduct.productName,
      price: newProduct.price,
      quantity: newProduct.quantity,
      qty: 1,
      image : newProduct.image,
      description: newProduct.description
      // Add other necessary details
    };
  
    // Get the CustomerID from localStorage
    const CID = localStorage.getItem('CID');
  
    // Get existing cart items from localStorage
    const existingCartItems = JSON.parse(localStorage.getItem('wishListItems')) || {};
  
    // Retrieve or initialize cart items for the specific CustomerID
    const cartItemsForCustomer = existingCartItems[CID] || [];
  
    // Append the selected product to the existing items for the specific CustomerID
    cartItemsForCustomer.push(selectedProduct);
  
    // Update the cart items object with the new items for the specific CustomerID
    existingCartItems[CID] = cartItemsForCustomer;
  
    // Update localStorage with the updated cart items
    localStorage.setItem('wishListItems', JSON.stringify(existingCartItems));


    
  
    console.log(`${selectedProduct.name} added to cart for CustomerID: ${CID}!`);
  };
  
  // const wishList = () => {
  //   console.log('Add to wishlist clicked!');
  
  //   const selectedProduct = {
  //     id: newProduct.id,
  //     name: newProduct.productName,
  //     price: newProduct.price,
  //     quantity: newProduct.quantity,
  //     qty: 1,
  //     image: newProduct.image,
  //     description: newProduct.description
  //     // Add other necessary details
  //   };
  
  //   // Get the CustomerID from localStorage
  //   const CID = localStorage.getItem('CID');
  
  //   // Get existing wishlist items from localStorage
  //   const existingWishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || {};
  
  //   // Retrieve or initialize wishlist items for the specific CustomerID
  //   const wishlistItemsForCustomer = existingWishlistItems[CID] || [];
  
  //   // Check if the product is already in the wishlist
  //   const isProductInWishlist = wishlistItemsForCustomer.some(item => item.id === selectedProduct.id);
  
  //   if (!isProductInWishlist) {
  //     // Append the selected product to the existing items for the specific CustomerID
  //     wishlistItemsForCustomer.push(selectedProduct);
  
  //     // Update the wishlist items object with the new items for the specific CustomerID
  //     existingWishlistItems[CID] = wishlistItemsForCustomer;
  
  //     // Update localStorage with the updated wishlist items
  //     localStorage.setItem('wishlistItems', JSON.stringify(existingWishlistItems));
  
  //     console.log(`${selectedProduct.name} added to wishlist for CustomerID: ${CID}!`);
  //   } else {
  //     console.log(`${selectedProduct.name} is already in the wishlist for CustomerID: ${CID}`);
  //   }
  // };
  



  let navigate=useNavigate()
  const {id}=useParams()

  const loadProduct= async ()=>{
    const result=await axios.get(`http://localhost:8080/products/get/${id}`)
    setNewProduct(result.data)
  }
  useEffect (()=>{
    loadProduct()
  },[id])

  const [newProduct, setNewProduct] = useState({
    productName: "",
    brand: "",
    price: 0,
    quantity: 0,
    description: "",
    image: "",
  });

console.log(newProduct.productName)








  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={newProduct.image}
              
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={newProduct.image}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={newProduct.image}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={newProduct.image}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{newProduct.productName}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{newProduct.price} TK</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                {/* <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a> */}
              </div>
            </div>

            <form className="mt-10" >
            

              {/* Sizes */}
            

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={addToCart} // Check if the onClick event is correctly connected to addToCart
                key={product.id}
                >
                  Add to bag
                </button>
            </form>
            <form className="mt-10" >
            

              {/* Sizes */}
            

              <button
                type="submit"
                className="mt-10 flex  items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={wishList} // Check if the onClick event is correctly connected to addToCart
                key={product.id}
                >
                  Add to Wish List
                </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{newProduct.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>

              <di v className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Customer Ratings & Reviews</h2>
                <div className="mt-4 space-y-4">
                  {ratings.map((rating) => (
                      <div key={rating.id} className="flex items-center">
                        {/* Render each rating */}
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((star) => (
                              <StarIcon
                                  key={star}
                                  className={
                                    star < rating.rating ? 'text-gray-900 h-5 w-5' : 'text-gray-200 h-5 w-5'
                                  }
                                  aria-hidden="true"
                              />
                          ))}
                        </div>
                        <p className="ml-2 text-sm text-gray-500">Rated by {rating.user.name}</p>
                        <p className="ml-2 text-sm text-gray-500">{rating.review}</p>
                      </div>
                  ))}
                </div>
              </di>

            </div>
          </div>
        </div>
      </div>
      <ProductListCustomerView/>
    </div>
  )
}
