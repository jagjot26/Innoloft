import { useSelector } from 'react-redux'
import useFetchProduct from './hooks/useFetchProduct'
import ReactPlayer from 'react-player/youtube'
import Loader from '../ReusableUI/Loader'

function ViewProduct() {
  useFetchProduct()
  const product = useSelector((state) => state.product)
  const {
    picture,
    type,
    name,
    description,
    company,
    user,
    video,
    categories,
    businessModels,
    trl,
    investmentEffort,
  } = product?.data

  if (product.status.fetch === 'loading')
    return (
      <div className="h-full w-full grid place-items-center">
        <Loader />
      </div>
    )
  return (
    <div className="flex flex-col gap-y-4 overflow-auto h-full pt-5 pb-5 pr-5 2xl:pr-36">
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
              <h2 className="text-md font-bold whitespace-normal">
                {name}
                <div className="badge bg-blue-600 border-0 text-xs lg:ml-2">
                  {type?.name ?? 'N.A.'}
                </div>
              </h2>
              <p className="text-xs">{description}</p>
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

      {video && (
        <section className="w-full rounded-lg border-2 p-5">
          <ReactPlayer width="100%" url={video} controls />
        </section>
      )}

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
            <div className="info-badge h-fit rounded-xl">{trl?.name}</div>
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

export default ViewProduct
