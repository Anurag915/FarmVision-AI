function PageHeader({
    title,
    description,
    action,
}){
    return(
        <div className="flex items-center justify-between mb-8">

            <div>
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

                <p className="text-gray-500 mt-2">{description}</p>
            </div>

            {action && <div>{action}</div>}
        </div>
    )
}

export default PageHeader