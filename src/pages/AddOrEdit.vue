<template lang="pug">
    div
        h2 bookId: {{bookId}}
        h1 Book {{!!bookId ? 'Edit': 'Add'}}
        .message_box.success(v-if="updateResponse", :class="{error: !updateResponse.ok }")
          p ok: {{updateResponse.ok}}
          p errors: {{updateResponse.errors || 'no errors'}}

        form
            // img(v-if="oneBook.image && !imagePreview", :src="`${imgPath}${oneBook.image}`")
            img.image_preview(
              v-if="isImgChange || oneBook.image", 
              :src="isImgChange ? imagePreview : `${this.imgPath}${this.oneBook.image}` ")

            label.change_image Change image
              input.file_input(
                type="file", 
                ref="file",
                accept="image/*",
                @change="onImageChange")
            label Title
                input.text_input(name="title", :value="oneBook.title" @change="onBookChange($event)")
            label Date
                input.text_input(type="date", name="date", :value="oneBook.date" @change="onBookChange($event)")

            label Author
                input.text_input(name="author", :value="`${oneBook.first_name} ${oneBook.last_name}`" @change="onBookChange($event)")
            label author_id ( from 1 to 60 000 )
                input.text_input(name="author_id", :value="oneBook.author_id" @change="onBookChange($event)")

            label Description
                textarea(name="description", @change="onBookChange($event)")
                  | {{oneBook.description}}
            // button.btn(@click="goBack()") Back        
            button.btn(@click.prevent="onSave()") Save   
                
</template>
<script>
export default {
  data: () => ({
    oneBook: {
      title: '',
      date: null,
      author_id: '',
      first_name: '',
      last_name: '',
      description: '',
      image: null
    },
    imageFile: null,
    isImgChange: false,

    imagePreview: null,
    updateResponse: null,
    imgPath: 'http://localhost:3000'
  }),
  props: {
    bookId: {
      type: Number
    }
  },
  computed: {
    // imagePreview() {
    // if (this.selectedImage) {
    //   const fileContents = await this.readUploadedFileAsText(
    //     this.selectedImage
    //   );
    //   return fileContents;
    // }
    // if (this.oneBook.image) {
    //   return `${this.imgPath}${this.oneBook.image}`;
    // }
    // return null;
    // }
  },
  methods: {
    onSave() {
      if (this.isImgChange) {
        this.uploadImage();
      }
      if (this.bookId) {
        this.$socket.emit('UPDATE_BOOK', this.oneBook);
      } else {
        this.$socket.emit('ADD_BOOK', this.oneBook);
      }
    },
    onBookChange(event) {
      const { name, value } = event.target;
      this.oneBook[name] = value;
    },
    onImageChange() {
      console.log('onImageChange');

      this.file = this.$refs.file.files[0];
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        function() {
          this.isImgChange = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );

      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file);
        }
      }
    },
    uploadImage() {
      console.log('uploadImage');

      const fileReader = new FileReader();
      const { file } = this;
      const slice = file.slice(0, 100000);

      fileReader.readAsArrayBuffer(slice);
      fileReader.onload = evt => {
        console.log('uploadImage.fileReader.onload');

        const arrayBuffer = fileReader.result;
        this.$socket.emit('slice upload', {
          name: file.name,
          type: file.type,
          size: file.size,
          data: arrayBuffer
        });
      };

      this.$options.sockets['request slice upload'] = data => {
        console.log('request slice upload');

        const place = data.currentSlice * 100000;
        const slice = file.slice(
          place,
          place + Math.min(100000, file.size - place)
        );

        fileReader.readAsArrayBuffer(slice);
      };

      this.$options.sockets['end upload'] = () => {
        console.log('end upload: ');
      };
    }
    // handleUpload: async e => {
    //   const file = e.target.files[0];

    //   try {
    //     const fileContents = await this.readUploadedFileAsText(file);
    //     console.log(fileContents);
    //   } catch (err) {
    //     console.error(err.message);
    //   }
    // },
    // readUploadedFileAsText(inputFile) {
    //   const temporaryFileReader = new FileReader();

    //   return new Promise((resolve, reject) => {
    //     temporaryFileReader.onerror = () => {
    //       temporaryFileReader.abort();
    //       reject(new DOMException('Problem parsing input file.'));
    //     };

    //     temporaryFileReader.onload = () => {
    //       resolve(temporaryFileReader.result);
    //     };
    //     temporaryFileReader.readAsText(inputFile);
    //   });
    // }
  },
  beforeMount() {
    if (this.bookId) {
      this.$socket.emit('ONE_BOOK', { id: this.bookId });
      this.$options.sockets.ONE_BOOK_RES = res => {
        console.log('ONE_BOOK_RES.res', res);
        const { oneBook } = res;
        this.oneBook = oneBook;
        console.log(this.oneBook);
      };
      this.$options.sockets.UPDATE_BOOK_RES = res => {
        console.log('UPDATE_BOOK_RES.res', res);
        this.updateResponse = res;
      };
    } else {
      this.$options.sockets.ADD_BOOK_RES = res => {
        console.log('ADD_BOOK_RES.res', res);
        this.updateResponse = res;
      };
    }
  }
};
</script>

<style lang="stylus" scoped>
.image_preview {
  width: 50%;
}

.change_image {
  text-align: center;
}

.file_input {
  display: block;
  margin: 5px auto;
}

form {
  max-width: 560px;
  margin: 60px auto;
  font-size: 21px;
  font-weight: 600;
}
</style>
