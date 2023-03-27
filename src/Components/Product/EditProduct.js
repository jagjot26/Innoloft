import { useReducer, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useFetchProduct from './hooks/useFetchProduct'
import useEditSuccess from './hooks/useEditSuccess'
import Loader from '../ReusableUI/Loader'
import { updateProductById } from './productSlice'

const reducer = (state, action) => {
  switch (action.field) {
    case 'all':
      return { ...state, ...action.data }
    case 'trl':
      const foundTRL = action.TRLs.find((trl) => trl.name === action.value)
      return { ...state, [action.field]: foundTRL }
    default:
      return { ...state, [action.field]: action.value }
  }
}

function EditProduct() {
  useFetchProduct(true)
  useEditSuccess()
  const dispatchInRedux = useDispatch()
  const product = useSelector((state) => state.product)

  const [productData, dispatch] = useReducer(reducer, {})

  useEffect(() => {
    const { name, description, video, categories, businessModels, trl } = product?.data
    dispatch({
      field: 'all',
      data: {
        name,
        description,
        video,
        categories,
        businessModels,
        trl,
      },
    })
  }, [product?.data])

  const { picture, company, user, categories, businessModels, trl, investmentEffort } =
    product?.data

  const handleChange = (field, value) => {
    const action = {
      field,
      value,
    }
    if (field === 'trl') action.TRLs = product.trls
    dispatch(action)
  }

  const handleSubmit = () => {
    dispatchInRedux(updateProductById({ productId: 6781, reqData: productData }))
  }

  if (product.status.fetch === 'loading')
    return (
      <div className="h-full w-full grid place-items-center">
        <Loader />
      </div>
    )
  return (
    <div className="flex flex-col gap-y-4 overflow-auto h-full pt-5 pb-5 pr-5 2xl:pr-36">
      <button
        className={`${
          product.status.update === 'loading' ? 'btn loading' : 'btn'
        } w-fit self-end whitespace-nowrap text-xs`}
        onClick={handleSubmit}
      >
        Save changes
      </button>
      <div className="flex flex-col gap-y-4 lg:flex-row">
        <section className="w-full rounded-lg lg:w-4/6 border-2 lg:rounded-tl-lg lg:rounded-bl-lg lg:rounded-br-none lg:rounded-tr-none bg-white">
          <div>
            <figure>
              <img
                className="h-auto w-full lg:max-h-64 object-top object-cover"
                src={picture}
                alt="productImg"
                loading="lazy"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full text-xs"
                  value={productData?.name ?? ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </h2>
              <textarea
                className="textarea textarea-bordered text-xs resize-none h-40"
                placeholder="Description"
                value={productData?.description ?? ''}
                onChange={(e) => handleChange('description', e.target.value)}
              ></textarea>
            </div>
          </div>
        </section>
        <section className="w-full rounded-lg lg:w-2/6 border-2 lg:border-l-0 lg:rounded-tr-lg lg:rounded-br-lg lg:rounded-bl-none lg:rounded-tl-none p-5 flex flex-col gap-5 bg-white">
          <p>Offered by</p>
          <img
            className="h-auto w-28 max-h-16 object-top object-cover"
            src={company?.logo}
            alt="logo"
            loading="lazy"
          />
          <div className="flex items-center gap-2">
            <img
              className="w-16 rounded-full"
              src={user?.profilePicture}
              loading="lazy"
              alt="userProfilePic"
            />
            <div>
              <p className="text-sm font-bold">{`${user?.firstName} ${user?.lastName}`}</p>
              <p className="text-sm">{company?.name}</p>
            </div>
          </div>
          <div>
            <p className="text-sm">{`${company?.address?.street} ${company?.address?.house},`}</p>
            <p className="text-sm">{`${company?.address?.zipCode}, ${company?.address?.city?.name}, ${company?.address?.country?.name}`}</p>
          </div>
          <div className="flex-1">
            {company?.address?.longitude && company?.address?.latitude && (
              <div className="h-full">
                <iframe
                  src={`https://maps.google.com/maps?ll=${company?.address?.latitude},${company?.address?.longitude}&z=13&t=&ie=UTF8&iwloc=&output=embed`}
                  title="addressMap"
                  style={{ height: '100%', width: '100%' }}
                ></iframe>
              </div>
            )}
          </div>
        </section>
      </div>
      <section className="w-full rounded-lg border-2 p-5">
        <p className="text-md mb-2">Video</p>
        <input
          type="text"
          placeholder="Video"
          className="input input-bordered w-full text-xs"
          value={productData?.video || ''}
          onChange={(e) => handleChange('video', e.target.value)}
        />
      </section>
      <section className="w-full rounded-lg border-2 p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 gap-x-12">
          <div>
            <p className="text-sm">Categories</p>
            {categories?.map((category, index) => (
              <div key={index} className="info-badge mr-1">
                {category.name}
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm">Business Model</p>
            {businessModels?.map((bm, index) => (
              <div key={index} className="info-badge mr-1">
                {bm.name}
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm">TRL</p>
            <select
              className="select select-bordered w-full max-w-xs mt-1 text-xs"
              value={productData?.trl?.name}
              onChange={(e) => handleChange('trl', e.target.value)}
            >
              <option disabled selected>
                Select
              </option>
              {product?.trls?.map((trl, index) => (
                <option key={index}>{trl?.name}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-sm">Costs</p>
            <div className="info-badge">{investmentEffort}</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EditProduct
