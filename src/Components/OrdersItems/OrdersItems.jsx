/* eslint-disable react/prop-types */


import logo from "../../assets/images/logo.svg";

export default function OrdersItems({ orderDetails }) {
  let {
    createdAt,
    id,
    isDelivered,
    isPaid,
    orderItems,
    paymentMethodType,
    shippingPrice,
    shippingAddress,
    taxPrice,
    totalOrderPrice,

    user,
  } = orderDetails;
  console.log(orderDetails);

  return (
    <>
<img src={logo} alt="" />
      <>
        {/* Invoice */}
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
          {/* Grid */}
          <div className="mb-5 pb-5 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-neutral-200">
                Invoice
              </h2>
            </div>
            {/* Col */}

            {/* Col */}
          </div>
          {/* End Grid */}
          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <div className="grid space-y-3">
                <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
                  <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                    Billed to:
                  </dt>
                  <dd className="text-gray-800 dark:text-neutral-200">
                    <a
                      className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                      href="#"
                    >
                      {user.name}
                    </a>
                  </dd>
                </dl>
                <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
                  <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                    Billing details:
                  </dt>
                  <dd className="font-medium text-gray-800 dark:text-neutral-200">
                    <span className="block font-semibold"> {user.name}</span>
                    <address className="not-italic font-normal">
                      {shippingAddress.city}
                    </address>
                  </dd>
                </dl>
                <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
                  <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                    Shipping details:
                  </dt>
                  <dd className="font-medium text-gray-800 dark:text-neutral-200">
                    <span className="block font-semibold"> {user.name}</span>
                    <address className="not-italic font-normal">
                      {shippingAddress.city}
                    </address>
                  </dd>
                </dl>
              </div>
            </div>
            {/* Col */}
            <div>
              <div className="grid space-y-3">
                <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
                  <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                    Invoice number:
                  </dt>
                  <dd className="font-medium text-gray-800 dark:text-neutral-200">
                    {id}
                  </dd>
                </dl>
                <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
                  <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                    Currency:
                  </dt>
                  <dd className="font-medium text-gray-800 dark:text-neutral-200">
                    USD - US Dollar
                  </dd>
                </dl>
                <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
                  <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                    Due date:
                  </dt>
                  <dd className="font-medium text-gray-800 dark:text-neutral-200">
                    {createdAt}
                  </dd>
                </dl>
                <dl className="flex flex-col sm:flex-row gap-x-3 text-sm">
                  <dt className="min-w-36 max-w-[200px] text-gray-500 dark:text-neutral-500">
                    Billing method:
                  </dt>
                  <dd className="font-medium text-gray-800 dark:text-neutral-200">
                    {paymentMethodType}
                  </dd>
                </dl>
              </div>
            </div>
            {/* Col */}
          </div>
          {/* End Grid */}

          {/* Table */}

          <div className="mt-6 border border-gray-200 p-4 rounded-lg space-y-4 dark:border-neutral-700">
            {/* Header */}
            <div className="hidden sm:grid sm:grid-cols-5">
              <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                Item
              </div>
              <div className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                Qty
              </div>
              <div className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                Rate
              </div>
              <div className="text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                Amount
              </div>
            </div>

            <div className="hidden sm:block border-b border-gray-200 dark:border-neutral-700" />

            {/* Table Body - Rendering Data Dynamically */}
            {orderDetails.cartItems.map((item, index) => (
              <div key={index}>
                <>
                  <div className="grid  grid-cols-3 sm:grid-cols-5 gap-2">
                    <div className="col-span-full sm:col-span-2">
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                        Item
                      </h5>
                      <p className="font-medium text-gray-800 dark:text-neutral-200">
                        {item.product.title.split(" ").slice(0, 3).join(" ")}
                      </p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                        Qty
                      </h5>
                      <p className="text-gray-800 dark:text-neutral-200">
                        {item.count}
                      </p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                        Rate
                      </h5>
                      <p className="text-gray-800 dark:text-neutral-200">
                        {item.product.ratingsAverage}
                      </p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                        Amount
                      </h5>
                      <p className="sm:text-end text-gray-800 dark:text-neutral-200">
                        {item.price} $
                      </p>
                    </div>
                  </div>
                  <div className=" block border-b my-2 border-gray-200 dark:border-neutral-700" />
                </>
              </div>
            ))}
          </div>

          {/* End Table */}
          {/* Flex */}

          <div className="mt-8 flex sm:justify-end">
            <div className="w-full max-w-2xl sm:text-end space-y-2">
              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                  <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                    Subotal:
                  </dt>
                  <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                    {totalOrderPrice} $
                  </dd>
                </dl>
                <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                  <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                    Total:
                  </dt>
                  <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                    {totalOrderPrice} $
                  </dd>
                </dl>
                <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                  <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                    Tax:
                  </dt>
                  <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                    {taxPrice} $
                  </dd>
                </dl>
                <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                  <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                    Amount paid:
                  </dt>
                  <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                    {totalOrderPrice} $
                  </dd>
                </dl>
                <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                  <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                    Due balance:
                  </dt>
                  <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                    {shippingPrice}
                  </dd>
                </dl>
              </div>
              {/* End Grid */}
            </div>
          </div>
          {/* End Flex */}
        </div>
        {/* End Invoice */}
      </>
    </>
  );
}
