document.addEventListener("DOMContentLoaded", function () {
  const images = [
    {
      src: "./img/nike1.png",
      color: "bg-blue-400",
      text: "text-blue-700",
      button: "bg-blue-600 hover:bg-blue-800",
      moveBg: "right-[220px] top-[400px]",
    },
    {
      src: "./img/nikered.png",
      color: "bg-red-400",
      text: "text-red-500",
      button: "bg-red-500 hover:bg-red-700",
    },
    {
      src: "./img/nikeyellow.png",
      color: "bg-yellow-400",
      text: "text-yellow-500",
      button: "bg-yellow-500 hover:bg-yellow-700",
      moveBg: "right-[220px] top-[380px]",
    },
  ];

  let currentIndex = 0;
  const slideshowElement = document.getElementById("slideshow");
  const changeBg = document.getElementById("change_bg");
  const textColor = document.getElementById("text_color");
  const buttonColor = document.getElementById("color_button");

  function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;
    slideshowElement.style.opacity = 0;

    setTimeout(() => {
      slideshowElement.src = images[currentIndex].src;
      slideshowElement.style.opacity = 1;
      slideshowElement.style.transition = "opacity 1.5s";

      changeBg.className = `absolute w-[550px] h-[550px] bg-blue-400 rounded-full right-[225px] top-[400px] transform -translate-y-1/2 z-60 hidden lg:block ${
        images[currentIndex].color
      } ${images[currentIndex].moveBg || ""}`;
      textColor.className = `text-[24px] md:text-[35px] ml-1 md:ml-0 font-bold  mb-2 text-blue-700 break-words ${images[currentIndex].text}`;
      buttonColor.className = `mt-[200px] md:mt-8 bg-blue-600 md:text-[20px] text-white  rounded-lg w-[180px] h-[70px] border-2 hover:bg-blue-800  ${images[currentIndex].button}`;
    }, 700);

    setTimeout(changeImage, 8000);
  }

  changeImage();
});

document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.getElementById("searchIcon");
  const searchBox = document.getElementById("searchBox");
  const menuToggle = document.getElementById("menuToggle");
  const menuList = document.getElementById("menuList");

  searchIcon.addEventListener("click", function (event) {
    event.stopPropagation();
    searchBox.classList.toggle("hidden");
  });

  // ปิด searchBox ถ้าคลิกที่อื่น
  document.addEventListener("click", function (event) {
    if (
      !searchBox.contains(event.target) &&
      !searchIcon.contains(event.target)
    ) {
      searchBox.classList.add("hidden");
    }
  });

  // แสดง/ซ่อนเมนู
  menuToggle.addEventListener("click", function (event) {
    event.stopPropagation();
    menuList.classList.toggle("hidden");
  });

  // ปิดเมนูถ้าคลิกที่นอกเมนู
  document.addEventListener("click", function (event) {
    if (
      !menuList.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      menuList.classList.add("hidden");
    }
  });
});

const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let current = 0;
const itemWidth = carousel.children[0].offsetWidth + 16;
const totalItems = carousel.children.length;

const updatePosition = (index) => {
  carousel.style.transform = `translateX(-${index * itemWidth}px)`;
};

const slideNext = () => {
  current = (current + 1) % totalItems;
  updatePosition(current);
};

const slidePrev = () => {
  current = (current - 1 + totalItems) % totalItems;
  updatePosition(current);
};

nextBtn.addEventListener("click", slideNext);
prevBtn.addEventListener("click", slidePrev);

document.getElementById("searchBox").addEventListener("input", function () {
  let filter = this.value.toLowerCase();
  let items = document.querySelectorAll("#carousel > div");

  items.forEach((item) => {
    let title = item.querySelector("h2").textContent.toLowerCase();
    if (title.includes(filter)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cart = document.getElementById("cart");
  const cartmenu = document.getElementById("cartmenu");
  const closemenu = document.getElementById("closemenu");

  cart.addEventListener("click", function (event) {
    event.stopPropagation();
    cartmenu.classList.toggle("hidden");
  });

  closemenu.addEventListener("click", function () {
    cartmenu.classList.add("hidden");
  });
  loadCart();

  function addToCart(name, price, img) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = cart.find((item) => item.name === name);

    if (product) {
      product.quantity++;
    } else {
      cart.push({ name, price, img, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }

  function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItem = document.getElementById("cartItem");
    let totalElement = document.getElementById("total");
    cartItem.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      let cartRow = document.createElement("div");
      cartRow.classList.add(
        "flex",
        "items-center",
        "justify-between",
        "border-b",
        "py-2"
      );

      cartRow.innerHTML = `
    <img src="${item.img}" class="w-16 h-16 object-contain">
    <span class="flex-1 text-center">${item.name}</span>
    <span>${item.price}฿</span>
    <div class="flex items-center ml-2">
        <button class="bg-red-500 text-white px-2" onclick="updateQuantity(${index}, -1)">-</button>
        <span class="mx-2">${item.quantity}</span>
        <button class="bg-green-500 text-white px-2" onclick="updateQuantity(${index}, 1)">+</button>
    </div>
          `;

      cartItem.appendChild(cartRow);
    });

    totalElement.textContent = total;

    let checkoutButton = document.createElement("button");
    checkoutButton.classList.add(
      "bg-blue-600",
      "text-white",
      "py-2",
      "w-full",
      "mt-4"
    );
    checkoutButton.textContent = "ชำระสินค้า";
    checkoutButton.addEventListener("click", checkoutAllItems); // ฟังก์ชันการชำระสินค้าทั้งหมด

    cartItem.appendChild(checkoutButton);

    // ซ่อนปุ่มชำระถ้าตะกร้าว่าง
    if (cart.length === 0) {
      checkoutButton.style.display = "none";
    } else {
      checkoutButton.style.display = "block";
    }
  }

  window.updateQuantity = function (index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index]) {
      cart[index].quantity += change;
      if (cart[index].quantity < 1) {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    }
  };

  document.querySelectorAll(".addToCart").forEach((button) => {
    button.addEventListener("click", () => {
      let productDiv = button.closest("div.border-2");
      let name = productDiv.querySelector("h2").textContent;
      let price = parseInt(
        productDiv
          .querySelector("span.text-blue-500")
          .textContent.replace("฿", "")
      );
      let img = productDiv.querySelector("img").src;
      addToCart(name, price, img);
    });
  });

  function checkoutAllItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalAmount = 0;

    cart.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });

    alert(`การชำระเงินทั้งหมด: ${totalAmount}฿`);

    localStorage.removeItem("cart");
    loadCart();
  }
});
