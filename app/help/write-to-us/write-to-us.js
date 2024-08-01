import FroudAlert from "@/app/ui/froud-alert";
import LaikaaFeatures from "@/app/ui/laikaa-features";

export default function WriteToUs() {
  return (
    <div className="container mx-auto px-5">
        <div className="max-w-[100%] w-[700px] mx-auto">
          <div className="mb-5">
            <h2 className="text-2xl font-bold pt-5">
              <span className="underline underline-offset-8 decoration-[#BD00FF]">
                WRITE To&nbsp;&nbsp;
              </span>
              <span>US</span>
            </h2>
          </div>
          <div className=" bg-[#F7F7F7] px-5 py-8 rounded">
            <form action="#">
                <div className="mb-5">
                    <p className="text-[#DD0000] text-[20px] font-semibold">Application Form</p>
                </div>
                <div>
                    <div className="mb-3">
                        <input className="w-[100%] rounded-lg bg-[#4645701f] border-s-[5px] border-s-[#DD0000]" type="text" placeholder="Name" />
                    </div>
                    <div className="mb-3">
                        <input className="w-[100%] rounded-lg bg-[#4645701f] border-s-[5px] border-s-[#DD0000]" type="text" placeholder="Phone Number" />
                    </div>
                    <div className="mb-3">
                        <input className="w-[100%] rounded-lg bg-[#4645701f] border-s-[5px] border-s-[#DD0000]" type="file" placeholder="Attach File" />
                    </div>
                    <div className="mb-3">
                        <textarea className="w-[100%] rounded-lg bg-[#4645701f] h-[200px] border-s-[5px] border-s-[#DD0000]"></textarea>
                    </div>
                    <div>
                        <button className="bg-[#DD0000] text-white px-14 py-2 block mx-auto">Submit</button>
                    </div>
                </div>
              </form>
          </div>
        </div>
        <div>
          <FroudAlert/>
        </div>
        <div>
          <LaikaaFeatures/>
        </div>
    </div>
  );
}
