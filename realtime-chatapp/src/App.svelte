<script>
  import { auth, googleProvider } from "./firebase.js";
  import { authState } from "rxfire/auth";
  import { signInWithPopup, signOut } from "firebase/auth";
  import Chatroom from "./Chatroom.svelte";

  let user;

  //   authState(auth).subscribe((u) => {
  //     user = u;
  //   });

  const unsubscribe = authState(auth).subscribe((u) => {
    user = u;
  });

  //   onDestroy(() => {
  //     unsubscribe && unsubscribe();
  //   });

  function login() {
    signInWithPopup(auth, googleProvider);
  }

  function logout() {
    signOut();
  }
</script>

<main>
  {#if user}
    <Chatroom {user} logout{logout} />
  {:else}
    <div class="login-form">
      <button on:click={login}
        >Login with Google
        <i class="fa fa-google"></i></button
      >
    </div>
  {/if}
</main>

<style>
  main {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 500px;
    background: #fff;
    border: 1px solid #eee;
    box-shadow: 0px 5px 10px rgba(o, o, o, 0.05);
  }

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .login-form button {
    padding: 10px 20px;
    border: 1px solid #bbb;
    background: #4285f4;
    color: #fff;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
  }

  .login-form button i.fa {
    padding-right: 10px;
    border-right: 1px solid #ddd;
    color: #fff;
  }
</style>
