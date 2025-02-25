import Card from "../../Components/Card/Card";
import Loading from "../../Components/Loading/Loading";
import Marquee from "react-fast-marquee";
import { Helmet } from "react-helmet";
import useProducts from "../../hooks/UseProducts";

export default function Products() {
  let { data, isLoading } = useProducts();


  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Products page of E-commerce website "
        />
        <meta name="keywords" content="E-commerce, Products, Products page" />
        <meta name="author" content="Mostafa Mohamed Ebrahim" />
        <title> Fresh Cart |Products</title>
      </Helmet>

      <div className="  bg-blue-600 bg-[url('https://preline.co/assets/svg/examples/abstract-1.svg')] bg-no-repeat bg-cover bg-center rounded-xl my-7 p-4">
        <Marquee speed={65} direction="right">
          <span className="mx-6 text-2xl font-semibold text-white">
            🔥 عرض خاص اليوم!
          </span>
          <span className="mx-6 text-2xl font-semibold text-white ">
            🎉 %اشترك للحصول على خصم 50
          </span>
          <span className="mx-6 text-2xl font-semibold text-white">
            🚀! أسرع شحن لجميع المنتجات
          </span>
        </Marquee>
      </div>

{isLoading && <Loading/>}
        <div className="grid grid-cols-1 mt-5 sm:grid-cols-3 md:grid-cols-4 gap-5 lg:grid-cols-4 xl:grid-cols-6">
          {data?.data?.data?.map((product) => (
            <div key={product.id}>
              <Card key={product.id} productInfo={product} />
            </div>
          ))}
        </div>
 
    </>
  );
}
