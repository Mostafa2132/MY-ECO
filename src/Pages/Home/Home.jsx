import Loading from "../../Components/Loading/Loading";
import Card from "../../Components/Card/Card";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import Marquee from "react-fast-marquee";
import { Helmet } from "react-helmet";
import useProducts from "../../hooks/UseProducts";
export default function Home() {
  let { data, isLoading } = useProducts();
  return (
    <>
      <Helmet>
        <title> Fresh Cart | Home</title>
        <meta name="description" content="Home page of E-commerce website " />
        <meta name="keywords" content="E-commerce, Home, Home page" />
        <meta name="author" content="Mostafa Mohamed Ebrahim" />
      </Helmet>
      <>
        {/* Announcement Banner */}
        <div className="bg-gradient-to-r p-2    absolute top-19 left-0 right-0 z-40  from-purple-600 to-blue-400">
          <Marquee speed={65} direction="right">
            <span className="mx-6 text-2xl font-semibold text-white">
              📢 ⚡ أقوى العروض وصلت! ⚡
            </span>
            <span className="mx-6 text-2xl font-semibold text-white ">
              🎉 %اشترك للحصول على خصم 50
            </span>
            <span className="mx-6 text-2xl font-semibold text-white">
              ⚡ لا تفوّت الفرصة! خصم خاص لمدة 24 ساعة فقط! 🕒✨
            </span>
            <span className="mx-6 text-2xl font-semibold text-white">
              🔥 احصل على خصم مميز لفترة قصيرة!
            </span>
          </Marquee>
        </div>
        {/* End Announcement Banner */}
      </>
      {/*     <HomeSlider /> */}
      <HomeSlider />
      {/* category slider */}
      <h2 className="text-2xl font-bold mt-5 text-sky-600 mb-6">
        Our Categories :{" "}
      </h2>
      <CategorySlider />
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
      {isLoading && <Loading />}
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
