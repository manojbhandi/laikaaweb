import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    
      <footer>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-white">
            <div className="col-span-4">
              <div className="mb-4">
                <Image src="/laikaa-logo.png" width={150} height={100} alt="" />
              </div>
              <div>
                <p className="text-white">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </div>
            </div>

            <div className="md:block hidden md:col-span-1"></div>

            <div className="col-span-2">
              <div>
                <p className="footer-text-title underline underline-offset-8">
                  Top Categories
                </p>
              </div>
              <div>
                <ul className="footer-list">
                  <li>
                    <Link href="/">Eyes Products</Link>
                  </li>
                  <li>
                    <Link href="/">Skin Products</Link>
                  </li>
                  <li>
                    <Link href="/">Lips Products</Link>
                  </li>
                  <li>
                    <Link href="/">Nails Products</Link>
                  </li>
                  <li>
                    <Link href="/">Hair Products</Link>
                  </li>
                  <li>
                    <Link href="/">Accessories</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-span-2">
              <div>
                <p className="footer-text-title underline underline-offset-8">
                  Quick Links
                </p>
              </div>
              <div>
                <ul className="footer-list">
                  <li>
                    <Link href="/">Offer Zone</Link>
                  </li>
                  <li>
                    <Link href="/">Manage Address</Link>
                  </li>
                  <li>
                    <Link href="/">Cart</Link>
                  </li>
                  <li>
                    <Link href="/">Profile</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-span-3">
              <div>
                <p className="footer-text-title underline underline-offset-8">
                  Get Our App From
                </p>
              </div>
              <div className="my-4">
                <Link href="#">
                  <Image
                    src="/google-playStore.jpg"
                    width={200}
                    height={100}
                    alt=""
                  />
                </Link>
              </div>
              <div>
                <Link href="#">
                  <Image
                    src="/apple-store.jpg"
                    width={200}
                    height={100}
                    alt=""
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    
  );
}
