<script>
  import { db } from "./firebase.js";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";
  import { doc, addDoc, collection, query, orderBy } from "firebase/firestore";

  export let user;
  export let logout;

  let message = "";
  const chatsCollection = collection(db, "chats");
  const orderedQuery = query(chatsCollection, orderBy("sentAt"));

  // Use collectionData and pipe with startWith
  const chats = collectionData(orderedQuery, "id").pipe(startWith([]));

  async function sendMessage() {
    try {
      await addDoc(chatsCollection, {
        uid: user.uid,
        message: message,
        avatar: user.photoURL,
        sentAt: +new Date(),
      });

      message = "";
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
</script>

<main>
  <div class="header">
    <div class="logo">Chatroom</div>
    <button on:click={logout}>Logout</button>
  </div>
  <div class="messages">
    {#each $chats as chat}
      {#if user.uid === chat.uid}
        <div class="message my-message">
          <div class="text">
            {chat.message}
          </div>
        </div>
      {:else}
        <div class="message other-message">
          <div class="avatar">
            <img src={chat.avatar} alt="avatar" />
          </div>
          <div class="text">
            {chat.message}
          </div>
        </div>
      {/if}
    {/each}
    <div class="form">
      <input type="text" bind:value={message} />
      <button on:click={sendMessage}><i class="fa fa-paper-plane"></i></button>
    </div>
  </div>
</main>

<style>
  main {
    height: 100%;
  }

  .header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    border-bottom: 1px solid #ddd;
  }
  .header .logo {
    font-size: 15px;
    font-weight: bold;
    color: #111;
  }

  .header button {
    padding: 5px 10px;
    border: 1px solid #ddd;
    background: transparent;
    color: #555;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
  }

  .form {
    display: flex;
    width: 100%;
    height: 50px;
    border-top: 1px solid #ddd;
  }

  .form input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    color: #111;
    padding: 10px;
  }

  .form button {
    padding: 10px;
    border: none;
    background: transparent;
    color: #555;
    font-size: 20px;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
  }

  .messages {
    height: calc(100% - 90px);
    overflow-y: auto;
    padding: 10px;
    overflow-y: auto;
    width: 100%;
  }

  .messages::-webkit-scrollbar {
    width: 4px;
    background: #fff;
  }
  .messages::-webkit-scrollbar-thumb {
    background: #888;
    width: 4px;
  }
  .messages .message {
    margin: 10px 0;
    display: flex;
  }

  .messages .my-message {
    justify-content: flex-end;
  }

  .messages .message .avatar {
    width: 30px;
    height: 30px;
    margin-right: 8px;
  }
  .messages .message .text {
    padding: 10px;
    background: #f0f4f7;
    color: #555;
    font-size: 13px;
    font-weight: 600;
    border-radius: 5px;
    max-width: fit-content;
    flex: 1;
  }

  .messages .message .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .messages .my-message .text {
    background: #555;
    color: #fff;
  }
</style>
