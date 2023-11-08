import React from 'react';
import image from './public/images/image.jpg';
import Pic1 from './public/images/Pic1.jpg';
import Pic2 from './public/images/Pic2.jpg';
import Pic3 from './public/images/Pic3.jpg';
import Pic4 from './public/images/Pic4.jpg';
import Pic5 from './public/images/Pic5.jpg';
import Pic6 from './public/images/Pic6.jpg';

export default function AboutUs() {
    return (
        <div>
            <p>Contact Page</p>
            <section className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className='columns-auto'>
                        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2'>
                            <div>
                                <h1>Cùng bạn đi đến mọi hành trình</h1>
                            </div>
                            <div>
                                <p>Mỗi chuyến đi là một hành trình khám phá cuộc sống và thế giới xung quanh, là cơ hội học hỏi và chinh phục những điều mới lạ của mỗi cá nhân để trở nên tốt hơn. Do đó, nâng cao chất lượng trải nghiệm của khách hàng là ưu tiên hàng đầu và là nguồn cảm hứng của chúng tôi</p>
                            </div>
                        </div>
                        <br></br>
                        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 bg-slate-400'>
                            <div>
                                <img loading='lazy' src={image} alt="Hình ảnh minh họa" />
                            </div>
                            <div>
                                <p>Mục đích của DaTraNgon là giúp cho khách hàng có trải nghiệm tốt hơn, vì vậy đội ngũ và các đối tác của GaTraNgon với nhiều kinh nghiệm về lĩnh vực cho thuê xe, công nghệ, bảo hiểm & du lịch sẽ mang đến cho hành trình của bạn thêm nhiều trải nghiệm mới lạ, thú vị cùng sự an toàn ở mức ổn định nhất.</p>
                            </div>
                        </div>
                        <img loading='lazy' src={image} alt="Hình ảnh minh họa" />
                        <br></br>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                            <h1>Ưu điểm của GaTraNgon</h1>
                            <div className="border p-4">
                                <div>
                                    <img src={Pic1} alt="Icon1"/>
                                </div>
                                <div>
                                    <img src={Pic2} alt="Icon2"/>
                                </div>
                            </div>
                            <div className="border p-4">
                                <div>
                                    <img src={Pic3} alt="Icon3"/>
                                </div>
                                <div>
                                    <img src={Pic4} alt="Icon4"/>
                                </div>
                            </div>
                            <div className="border p-4">
                                <div>
                                    <img src={Pic5} alt="Icon5"/>
                                </div>
                                <div>
                                    <img src={Pic6} alt="Icon6"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
