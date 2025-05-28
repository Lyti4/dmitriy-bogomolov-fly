import { useState } from 'react';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log('Form submitted:', formData);
    // В реальном приложении здесь был бы код отправки данных на сервер
    // Данные будут отправлены на email: kinder1418986@gmail.com или по телефону +7 (926) 546-45-45
    setIsSubmitted(true);

    // Reset form after submission
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    });

    // Reset submission status after delay
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="py-16 bg-white" id="contacts">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-12">
          Свяжитесь с <span className="font-medium">нами</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-[#F9F7F2] p-6 md:p-8 rounded-lg mb-8">
              <h3 className="text-xl font-medium text-gray-800 mb-6">Контактная информация</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-[#8DB892] mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Адрес</h4>
                    <p className="text-gray-600">г.Балашиха ул.Текстильщиков 16</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#8DB892] mr-4 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Телефон</h4>
                    <p className="text-gray-600">+7 (926) 546-45-45</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F9F7F2] p-6 md:p-8 rounded-lg">
              <h3 className="text-xl font-medium text-gray-800 mb-6">Мы в мессенджерах</h3>

              <div className="flex space-x-4">
                <a href="https://t.me/DecorFusion" target="_blank" rel="noopener noreferrer" className="bg-white h-10 w-10 rounded-full flex items-center justify-center text-[#8DB892] hover:text-white hover:bg-[#8DB892] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-800 mb-6">Заказать консультацию</h3>

            {isSubmitted ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6">
                <p className="font-medium">Спасибо за обращение!</p>
                <p>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8DB892] focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8DB892] focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8DB892] focus:border-transparent"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  autoComplete="off"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8DB892] focus:border-transparent"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#8DB892] hover:bg-[#7AA37E] text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8DB892]"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
