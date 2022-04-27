

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {{-- <script src="https://cdn.tailwindcss.com"></script> --}}
    <title>@yield('title')</title>
    <style>
        .active{
            color:red;
            font-weight: bold; 
        }
    </style>
</head>
<body>
    <header>
        @include('layouts.partials.header')
    </header>
    <h1>@yield('content')</h1>
</body>
</html>