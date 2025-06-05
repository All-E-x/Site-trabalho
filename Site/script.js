const products = [
    {
      id: 1,
      name: "Blusa com saia vermelha",
      price: 89.90,
      image: "https://i.pinimg.com/736x/bd/3d/4d/bd3d4d4bfda2f664f885e2ac2e62ec38.jpg"
    },
    {
      id: 2,
      name: "Terno preto",
      price: 129.90,
      image: "https://i.pinimg.com/736x/ab/ff/d3/abffd3d00edf2d3497d118f9b3123bae.jpg"
    },
    {
      id: 3,
      name: "Casaco sobretudo",
      price: 149.90,
      image: "https://i.pinimg.com/736x/4a/e6/20/4ae62086b599b953e31ac176b95d578e.jpg"
    },
    {
      id: 4,
      name: "Vestido Midi",
      price: 149.90,
      image: "https://i.pinimg.com/736x/ed/a0/94/eda0949d7c14a114e6bdfb996714a6c2.jpg"
    },
    {
      id: 5,
      name: "Calça Jeans",
      price: 149.90,
      image: "https://i.pinimg.com/736x/fc/d3/55/fcd35593d900a2abc198325a777b10c0.jpg"
    },
    {
      id: 6,
      name: "Blusa Feminina",
      price: 149.90,
      image: "https://i.pinimg.com/736x/8a/a4/53/8aa453426c8dc68d1818d704cb0808a4.jpg"
    },
    {
      id: 7,
      name: "Cachecol",
      price: 149.90,
      image: "https://estiloamago.com.br/cdn/shop/files/18_1_8c09aa34-a3c1-42fb-99ab-c36d14bdc053.png?v=1744209575&width=600"
    },
    {
      id: 8,
      name: "Camisa masculina",
      price: 149.90,
      image: "https://i.pinimg.com/736x/e3/f3/83/e3f383fb562752c1649587f43a27fdb8.jpg"
    },
    {
      id: 9,
      name: "Bota feminina",
      price: 149.90,
      image: "https://i.pinimg.com/736x/53/0a/9c/530a9cb04d28afa354309de3cd2e4cee.jpg"
    },
    {
      id: 10,
      name: "Vestido Longo",
      price: 149.90,
      image: "https://i.pinimg.com/736x/45/00/11/4500110ddd8b3c53b6165852df81a34a.jpg"
    },
    {
      id: 11,
      name: "Casaco",
      price: 149.90,
      image: "https://i.pinimg.com/736x/d9/9e/2c/d99e2c4e240d693d7aa44cdbad27df9d.jpg"
    },
    {
      id: 12,
      name: "touca",
      price: 149.90,
      image: "https://i.pinimg.com/736x/d1/3d/47/d13d4704ac98a11ccb4b8c4ea32fb26b.jpg"
    },
    {
      id: 13,
      name: "macacão",
      price: 149.90,
      image: "https://i.pinimg.com/736x/83/15/de/8315de6fc7fa3da2e96f3a615f95fc13.jpg"
    },
    {
      id: 14,
      name: "Conjunto camisa e short",
      price: 149.90,
      image: "https://i.pinimg.com/736x/3f/08/0b/3f080b08f5190d38a22a0e97692a46ee.jpg"
    },
    {
      id: 15,
      name: "saia",
      price: 149.90,
      image: "https://i.pinimg.com/736x/36/8e/57/368e575f2224d854a2b1ef6fab725053.jpg"
    }
  ];
  
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let user = JSON.parse(localStorage.getItem("user")) || null;
  
  function renderProducts() {
    const container = document.getElementById("products-container");
    container.innerHTML = "";
    products.forEach(product => {
      const div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>R$ ${product.price.toFixed(2)}</p>
        <button onclick="handleAddToCart(${product.id})">Adicionar</button>
      `;
      container.appendChild(div);
    });
  }
  
  function handleAddToCart(productId) {
    if (!user) {
      showLoginForm();
      return;
    }
  
    const confirmation = confirm("Deseja adicionar este item ao carrinho?");
    if (confirmation) {
      addToCart(productId);
    }
  }
  
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }
  
  function updateCartUI() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
  
    cartItems.innerHTML = "";
    let total = 0;
  
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
      cartItems.appendChild(li);
      total += item.price;
    });
  
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
  }
  
  function showLoginForm() {
    document.getElementById("login-section").classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  function hideLoginForm() {
    document.getElementById("login-section").classList.add("hidden");
  }
  
  function updateLoginButtonUI() {
    const loginBtn = document.getElementById("login-btn");
    if (user) {
      loginBtn.textContent = `Bem-vindo, ${user.nome}`;
      loginBtn.disabled = true;
    } else {
      loginBtn.textContent = "Login";
      loginBtn.disabled = false;
    }
  }
  
  // Event Listeners
  document.getElementById("cart-toggle").addEventListener("click", () => {
    document.getElementById("cart").classList.toggle("visible");
  });
  
  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const ano = parseInt(document.getElementById("ano").value);
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
  
    if (nome && ano > 1900 && email && senha) {
      user = { nome, ano, email };
      localStorage.setItem("user", JSON.stringify(user));
      hideLoginForm();
      updateLoginButtonUI();
      alert(`Login realizado com sucesso! Bem-vindo, ${nome}`);
    } else {
      alert("Preencha todos os campos corretamente.");
    }
  });
  
  document.getElementById("login-btn").addEventListener("click", () => {
    showLoginForm();
  });
  
  document.getElementById("checkout").addEventListener("click", () => {
    const errorMsg = document.getElementById("checkout-error");
    errorMsg.classList.remove("hidden");
  });
  
  // Inicialização
  renderProducts();
  updateCartUI();
  updateLoginButtonUI();