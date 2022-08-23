import app from './application/app';

// Settings
app.set('port', 4000);

const main = () => {
    app.listen(app.get('port'));
    console.log(`Server on port ${app.get('port')}`);
}

main();
