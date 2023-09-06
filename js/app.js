//  shortByDate()

const handleAllData = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
  const data = await res.json();
  const result = data.data.tools;
  result.splice(5, 1);
  result.splice(9, 2);

  displayData(result);
};

const shortByDate = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
  const data = await res.json();
  const result = data.data.tools;
  result.splice(5, 1);
  result.splice(9, 2);

  const shortByDate = result.sort((a, b) => {
    const date1 = new Date(a.published_in);
    const date2 = new Date(b.published_in);

    return (final = date2 - date1);
  });

  displayData(shortByDate);
};

const displayData = (result) => {
  console.log(result);
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  result.forEach((element) => {
    const { id, image, name, published_in, features } = element;
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card  bg-base-100 shadow-xl max-h-[500px]">
         <figure><img class='w-full ' src="${
           image ? image : "image not found "
         }"" alt=""/></figure>
              <div class="card-body">
                  <h2 class="card-title text-2xl font-semibold">Features</h2>
                   <p>1. ${features[0]}</p>
                   <p>2. ${features[1]}</p>
                   <p>3. ${features[2]}</p>
                     <hr>
                    <div class="flex justify-between items-center">
                      <div>
                        <h4 class="text-lg font-medium">${name}</h4>
                        <p>${published_in}</p>
                      </div>
                      <a onclick="showDetails('${id}') " class="cursor-pointer"><i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
       </div>

    `;

    cardContainer.appendChild(div);
  });
};

const showDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const result = await res.json();
  const {
    description,
    features,
    integrations,
    image_link,
    pricing,
    input_output_examples,
  } = result.data;

  const modalContainer = document.getElementById("modal-container");
  modalContainer.textContent = "";

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="modal-box max-w-full mx-auto">
  <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
  </form>
  <div class=" flex flex-col md:flex md:flex-row items-center">
  <div class="lg:w-1/2">
      <h2 class="text-2xl font-semibold">
      ${description}
      </h2>
      <div class="flex flex-col gap-5 md:flex-row justify-between items-center my-10">
          <a class="h-10  bg-orange-400 p-4 lg:p-5 text-lg text-white cursor-pointer rounded" href="">
              ${pricing[0].price}<br/>  ${pricing[0].plan} </a>
          <a class="bg-orange-400 p-4 lg:p-5 text-lg text-white  cursor-pointer rounded my-5" href="">
          ${pricing[1].price} <br/> ${pricing[1].plan}
            </a>
          <a class="bg-orange-400 p-2 lg:p-5 text-lg text-white cursor-pointer rounded" href="">
          ${pricing[2].price}<br/> ${pricing[2].plan}
       </a>
      </div>
      <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-6">
              <h3 class="text-2xl font-semibold mb-3">Features</h3>
              <ul>
                  <li>${features[1].feature_name}</li>
                  <li>${features[2].feature_name}</li>
                  <li>${features[3].feature_name}</li>
                 
              </ul>
          </div>
          <div>
              <h3 class="text-2xl font-semibold mb-3">Integrations</h3>
              <ul>
              <li>${integrations[0]}</li>
              <li>${integrations[1]}</li>
              <li>${integrations[2]}</li>
                  
              </ul>
          </div>
      </div>
  </div>
  <div class="lg:w-1/2">
      <div class="card">
          <figure class="px-10 pt-10 ">
              <img src="${
                image_link[0] ? image_link[0] : image_link[1]
              } " alt="image" class="rounded-xl " />
          </figure>
          <div class="card-body items-center text-center">
              <h2 class="card-title">${input_output_examples[0].input}<h2/>
              <p>${input_output_examples[0].output}</p>

          </div>
      </div>
  </div>
</div>
</div>
  
  `;
  modalContainer.appendChild(div);
  my_ai_modal.showModal();
};

handleAllData();
