import Logo from "../assets/Logo.png";
function MainPage() {
  return (
    <div
      className="d-flex align-items-center flex-row-reverse justify-content-center"
      style={{ height: "100vh" }}
    >
      <div>
        <iframe
          src="https://lottie.host/embed/0fe55739-c964-489e-8176-93cc87fda4cc/Pw18bpPaZl.json"
          width={400}
          height={400}
        ></iframe>
      </div>
      <div>
        <h2 className="text-center">
          اهلا بكم في لوحة تحكم منيو <br /> كافيه القلعة
          <img src={Logo} width={30} className="ms-1 me-1" />
          الاكتروني
        </h2>
        <p>(يمكنكم البدء باختيار القسم الذي تودون التحكم به من القائمة )</p>
      </div>
    </div>
  );
}
export default MainPage;
