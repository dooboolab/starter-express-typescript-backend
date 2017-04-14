/**
 * Created by hyochan on 9/23/15.
 */
const params =  {
    server: this.mode === 'production' ? 'your_website' : 'http://localhost:3001/',
    mode: '', // dev? production?
    params : {
        // 서버에서 가변적으로 설정하는 파라미터
    },
};

export default params;
