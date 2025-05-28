const About = () => {
  return (
    <section className="py-16 bg-white" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-12">
          О <span className="font-medium">нас</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-xl font-medium text-gray-800 mb-4">
  «Форма. Функция. Тишина.»
</h3>

<div className="text-gray-600 mb-4">
  <p className="mb-4">Мы создаём предметы интерьера, где:</p>
  <ul className="list-disc pl-5 space-y-2 mb-4">
    <li>Чистая геометрия становится языком общения с пространством</li>
    <li>Каждый миллиметр просчитан, но последнее слово всегда за человеческим глазом</li>
    <li>Технологии служат только для совершенствования ручной работы</li>
  </ul>
</div>

<div className="text-gray-600 mb-4">
  <h4 className="font-medium mb-2">Наш подход:</h4>
  <div className="mb-3">
    <p className="font-medium">1. Супрематический минимализм</p>
    <p>- Элементарные формы с бескомпромиссной функциональностью<br />
       - Материалы подчиняются концепции, а не наоборот<br />
       - Дерево используется как акцент, а не как догма</p>
  </div>
  
  <div className="mb-3">
    <p className="font-medium">2. Artisanal Intelligence</p>
    <p>- Цифровые инструменты — только основа для творчества<br />
       - Опыт мастера важнее слепого следования чертежам<br />
       - Совершенство в деталях, которые чувствуются, но не видны</p>
  </div>
</div>

<div className="text-gray-600 mb-4">
  <h4 className="font-medium mb-2">Что мы предлагаем:</h4>
  <p>▸ Системы хранения, растворяющиеся в пространстве<br />
     ▸ Столы-скульптуры с безупречной эргономикой<br />
     ▸ Полки, превращающие стену в архитектурный проект</p>
</div>

<div className="text-gray-600 mb-6">
  <p className="font-medium mb-2">Для тех, кто:</p>
  <p>→ Ценит тишину в дизайне<br />
     → Ищет вещи с внутренней логикой<br />
     → Понимает разницу между модным и вечным</p>
</div>

<p className="text-gray-600 italic mb-4">
  «Мы создаём не мебель — мы проектируем среду для жизни.»
</p>

<p className="text-gray-500 text-sm">
  P.S. Наш &quot;AI&quot; — Artisanal Intelligence, где опыт важнее алгоритмов.
</p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="bg-[#5AAADF] h-12 w-12 rounded-full flex items-center justify-center text-white mr-3">
                  <span className="text-lg font-medium">8+</span>
                </div>
                <span className="text-gray-700">Лет опыта</span>
              </div>

              <div className="flex items-center">
                <div className="bg-[#5AAADF] h-12 w-12 rounded-full flex items-center justify-center text-white mr-3">
                  <span className="text-lg font-medium">300+</span>
                </div>
                <span className="text-gray-700">Довольных клиентов</span>
              </div>

              <div className="flex items-center">
                <div className="bg-[#5AAADF] h-12 w-12 rounded-full flex items-center justify-center text-white mr-3">
                  <span className="text-lg font-medium">5</span>
                </div>
                <span className="text-gray-700">Мастеров</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src="/images/kyxnia12.jpg"
              alt="Наша работа - кухня из массива дерева"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
