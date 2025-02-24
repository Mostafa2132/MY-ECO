import notFoundImg from "../../assets/images/error.svg";
export default function Notfound() {
  return (
    <>
      <div className="item felx items-center w-3/4 mx-auto  justify-center ">
        <img
          src={notFoundImg}
          className="w-full"
          loading="lazy"
          alt="not found image "
        />
      </div>
    </>
  );
}
